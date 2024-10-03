import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";
import { HttpLambdaApi } from "./LambdaApi";
import { StaticSite } from "./StaticSite";

interface WebApiStackProps extends cdk.StackProps {
  domainName: string;
  certificate: acm.Certificate;
}

export class WebApiStack extends cdk.Stack {
  constructor(scope: Construct, name:string, props: WebApiStackProps) {
    super(scope, `${name}-WebApi`, props);

    const certificateArn = props.certificate.certificateArn;

    const website = new StaticSite(this, `Website`, {
      domainName: props.domainName,
      codePath: "../client/build",
      certificateArn
    });

    const lambdaApi = new HttpLambdaApi(this, `Api`, {
      name,
      domainName: props.domainName,
      codePath: "../server/artifact",
      distribution: website.distribution
    });
  }
}
