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
import {AssetCode, Function, Runtime} from "aws-cdk-lib/aws-lambda";
import {Construct} from "constructs";

interface LambdaApiProps {
  name: string;
  domainName: string;
  codePath: string;
  prefixPath?: string;
  distribution?: cloudfront.Distribution;
}

export class HttpLambdaApi extends Construct {
  private httpApi: HttpApi;
  private lambdaFunction: Function;

  constructor(scope: Construct, id: string, props: LambdaApiProps) {
    super(scope, id);

    const prefix = props.prefixPath ? props.prefixPath : "api";

    // setup lambda
    this.lambdaFunction = new Function(this, "Lambda", {
      functionName: `${props.name}-api`,
      handler: "src/lambda.handler",
      runtime: Runtime.NODEJS_20_X,
      code: new AssetCode(props.codePath),
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
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
