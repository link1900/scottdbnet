import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { StaticSite } from "./static-site";

export class ScottdbnetStack extends Stack {
  constructor(scope: Construct, props?: StackProps) {
    const name = "scottdbnet";
    super(scope, name, props);

    const staticSite = new StaticSite(this, `Site`, {
      domainName: "scottdb.net",
      codePath: "../build"
    });
  }
}
