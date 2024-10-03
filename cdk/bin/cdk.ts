#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {CertificateStack} from "../lib/certificate-stack";
import { WebApiStack } from "../lib/web-api-stack";

const app = new cdk.App();
const name = "scottdbnet";
const domainName = "scottdb.net";

const certStack = new CertificateStack(app, name, {
  domainName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'us-east-1'
  },
  crossRegionReferences: true,
});

new WebApiStack(app, name, {
  domainName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
  certificate: certStack.certificate,
  crossRegionReferences: true,
});
