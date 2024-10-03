import * as cdk from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

interface CertificateStackProps extends cdk.StackProps {
  domainName: string;
}

export class CertificateStack extends cdk.Stack {
  public readonly certificate: acm.Certificate;
  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, `${id}-Certificate`, props);

    const zone = route53.HostedZone.fromLookup(this, "Zone", {
      domainName: props.domainName
    });

    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(zone)
    });
    this.certificate = certificate;

    new cdk.CfnOutput(this, 'CertificateArn', {
      value: certificate.certificateArn
    });
  }
}
