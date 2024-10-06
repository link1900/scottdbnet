import * as cdk from "aws-cdk-lib";
import {aws_cloudfront_origins} from "aws-cdk-lib";
import {CorsHttpMethod, HttpApi} from "aws-cdk-lib/aws-apigatewayv2";
import {HttpLambdaIntegration} from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import {
  OriginRequestHeaderBehavior,
  OriginRequestPolicy,
  OriginRequestQueryStringBehavior
} from "aws-cdk-lib/aws-cloudfront";
import {Vpc} from "aws-cdk-lib/aws-ec2";
import {AccessPoint, FileSystem} from "aws-cdk-lib/aws-efs";
import {AssetCode, Function, Runtime, FileSystem as LambdaFileSystem } from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";

interface LambdaApiProps {
  name: string;
  domainName: string;
  codePath: string;
  migrationCodePath: string;
  prefixPath?: string;
  distribution?: cloudfront.Distribution;
}

export class HttpLambdaApi extends Construct {
  private httpApi: HttpApi;
  public lambdaFunction: Function;
  public migrationFunction: Function;

  constructor(scope: Construct, id: string, props: LambdaApiProps) {
    super(scope, id);

    // setup vpc
    const vpc = new Vpc(this, 'Vpc', {
      maxAzs: 2
    });

    // setup efs file system
    const fileSystem = new FileSystem(this, 'FileSystem', {
      vpc,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // setup access point
    const accessPoint = new AccessPoint(this, 'AccessPoint', {
      fileSystem,
      path: '/export/lambda',
      posixUser: {
        uid: '1001',
        gid: '1001'
      },
      createAcl: {
        ownerGid: '1001',
        ownerUid: '1001',
        permissions: '750'
      }
    });


    // setup migration lambda
    this.migrationFunction = new Function(this, "MigrationLambda", {
      functionName: `${props.name}-migration`,
      handler: "migrator.handler",
      runtime: Runtime.NODEJS_20_X,
      code: new AssetCode(props.migrationCodePath),
      memorySize: 256,
      timeout: cdk.Duration.minutes(2),
      vpc,
      filesystem: LambdaFileSystem.fromEfsAccessPoint(accessPoint, '/mnt/data'),
    });

    // setup api lambda
    const prefix = props.prefixPath ? props.prefixPath : "api";
    this.lambdaFunction = new Function(this, "Lambda", {
      functionName: `${props.name}-api`,
      handler: "index.handler",
      runtime: Runtime.NODEJS_20_X,
      code: new AssetCode(props.codePath),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      vpc,
      filesystem: LambdaFileSystem.fromEfsAccessPoint(accessPoint, '/mnt/data'),
      environment: {
        EXECUTION_ENVIRONMENT: "prod",
        API_PREFIX: prefix
      }
    });

    // setup api gateway HTTP API
    this.httpApi = new HttpApi(this, "HttpApi", {
      apiName: `${props.name}-api`,
      corsPreflight: {
        allowHeaders: ["Content-Type"],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ["*"]
      }
    });

    // add routes to HTTP API
    this.httpApi.addRoutes({
      path: "/{proxy+}",
      integration: new HttpLambdaIntegration("LambdaIntegration", this.lambdaFunction)
    });

    // setup cdn routing
    // origin request policy
    const originRequestPolicy = new OriginRequestPolicy(this, "OriginRequestPolicy", {
      headerBehavior: OriginRequestHeaderBehavior.allowList(
        "access-control-request-method",
        "origin",
        "user-agent"
      ),
      queryStringBehavior: OriginRequestQueryStringBehavior.all()
    });

    // get api to cdn distribution under the provided prefixPath
    if (props.distribution){
      const apiPrefixPath = `/${prefix}/*`;

      // define the origin for the API Gateway
      const apiOrigin = new aws_cloudfront_origins.HttpOrigin(`${this.httpApi.apiId}.execute-api.${cdk.Stack.of(this).region}.amazonaws.com`);

      props.distribution.addBehavior(apiPrefixPath, apiOrigin, {
        originRequestPolicy,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY
      });
    }
  }
}
