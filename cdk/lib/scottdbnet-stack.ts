import * as cdk from "@aws-cdk/core";
import { StaticSite } from "./static-site";

export class ScottdbnetStack extends cdk.Stack {
  constructor(parent: cdk.App, props: cdk.StackProps) {
    const name = "scottdbnet";
    super(parent, name, props);

    new StaticSite(this, `${name}-frontend`, {
      domainName: "scottdb.net"
    });
  }
}
