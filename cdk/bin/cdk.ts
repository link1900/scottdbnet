#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ScottdbnetStack } from "../lib/scottdbnet-stack";

const app = new cdk.App();
new ScottdbnetStack(app, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
