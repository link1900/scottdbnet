import { LambdaIntegration, RestApi, Cors } from "aws-cdk-lib/aws-apigateway";
import { Function, Runtime, AssetCode } from "aws-cdk-lib/aws-lambda";
import { HostedZone, ARecord, RecordTarget } from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import {
  DnsValidatedCertificate,
  Certificate
} from "aws-cdk-lib/aws-certificatemanager";
import { CfnOutput, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";

interface LambdaApiProps {
  name: string;
  hostDomain: string;
  siteDomainPrefix?: string;
  apiDomainPrefix: string;
  codePath: string;
}

export class GraphqlLambdaApi extends Construct {
  private restApi: RestApi;
  private lambdaFunction: Function;

  constructor(scope: Construct, id: string, props: LambdaApiProps) {
    super(scope, id);

    // lookup hosted zone
    const zone = HostedZone.fromLookup(this, "Zone", {
      domainName: props.hostDomain
    });

    // define domains
    const siteDomain = props.siteDomainPrefix
      ? `${props.siteDomainPrefix}.${props.hostDomain}`
      : props.hostDomain;
    const apiDomain = `${props.apiDomainPrefix}.${siteDomain}`;

    // setup TLS certificate
    const certificateArn = new DnsValidatedCertificate(this, "ApiCertificate", {
      domainName: apiDomain,
      hostedZone: zone
    }).certificateArn;
    new CfnOutput(this, "Certificate", { value: certificateArn });

    const cert = Certificate.fromCertificateArn(
      this,
      "ApiGatewayCertificate",
      certificateArn
    );

    // setup lambda
    this.lambdaFunction = new Function(this, "Lambda", {
      functionName: `${props.name}-graphql`,
      handler: "src/index.handler",
      runtime: Runtime.NODEJS_20_X,
      code: new AssetCode(props.codePath),
      memorySize: 1024,
      timeout: Duration.seconds(30),
      environment: {
        EXECUTION_ENVIRONMENT: "prod"
      }
    });

    // setup api gateway
    this.restApi = new RestApi(this, "Api", {
      restApiName: `${props.name}`,
      domainName: {
        domainName: apiDomain,
        certificate: cert
      },
      deployOptions: {
        stageName: "prod"
      },
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS
      }
    });

    const graphqlApi = this.restApi.root.addResource("graphql");

    graphqlApi.addMethod("GET", new LambdaIntegration(this.lambdaFunction, {}));

    graphqlApi.addMethod(
      "POST",
      new LambdaIntegration(this.lambdaFunction, {})
    );

    // Route53 alias record for api gateway
    new ARecord(this, "ApiAliasRecord", {
      recordName: apiDomain,
      target: RecordTarget.fromAlias(new targets.ApiGateway(this.restApi)),
      zone
    });
  }
}
