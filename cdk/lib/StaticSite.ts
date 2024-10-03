#!/usr/bin/env node
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as iam from "aws-cdk-lib/aws-iam";
import { CfnOutput, Duration, RemovalPolicy, Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CacheControl } from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';

export interface StaticSiteProps {
  domainName: string;
  siteSubDomain?: string;
  codePath: string;
  certificateArn: string;
}

/**
 * Static site infrastructure, which deploys site content to an S3 bucket.
 *
 * The site redirects from HTTP to HTTPS, using a CloudFront distribution,
 * Route53 alias record, and ACM certificate.
 */
export class StaticSite extends Construct {

  public readonly distribution: cloudfront.Distribution;

  constructor(parent: Stack, name: string, props: StaticSiteProps) {
    super(parent, name);

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName
    });

    const siteDomain =
      props.siteSubDomain !== undefined
        ? props.siteSubDomain + "." + props.domainName
        : props.domainName;
    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "cloudfront-OAI",
      {
        comment: `OAI for ${name}`
      }
    );

    new CfnOutput(this, "Site", { value: "https://" + siteDomain });

    // Content bucket
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: siteDomain,
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "error.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,

      /**
       * The default removal policy is RETAIN, which means that cdk destroy will not attempt to delete
       * the new bucket, and it will remain in your account until manually deleted. By setting the policy to
       * DESTROY, cdk destroy will attempt to delete the bucket, but will error if the bucket is not empty.
       */
      removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production code

      /**
       * For sample purposes only, if you create an S3 bucket then populate it, stack destruction fails.  This
       * setting will enable full cleanup of the demo.
       */
      autoDeleteObjects: true // NOT recommended for production code
    });

    // grant access to cloudfront
    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["s3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          )
        ]
      })
    );
    new CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    // TLS certificate
    const certificate = acm.Certificate.fromCertificateArn(this, 'SiteCertificate', props.certificateArn);
    new CfnOutput(this, 'Certificate', { value: certificate.certificateArn });

    // bucket OAI
    const origin = cloudfront_origins.S3BucketOrigin.withOriginAccessIdentity(siteBucket, {
      originAccessIdentity: cloudfrontOAI
    });

    // CloudFront distribution
    this.distribution = new cloudfront.Distribution(
      this,
      "SiteDistribution",
      {
        defaultRootObject: "index.html",
        certificate: certificate,
        domainNames: [siteDomain],
        minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        defaultBehavior: {
          origin,
          compress: true,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
        },
        errorResponses: [
          {
            ttl: Duration.seconds(300),
            httpStatus: 403,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
          {
            ttl: Duration.seconds(300),
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      }
    );

    new CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId
    });

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, "SiteAliasRecord", {
      recordName: siteDomain,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(this.distribution)
      ),
      zone
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, "DeployNewCode", {
      sources: [
        s3deploy.Source.asset(props.codePath, { exclude: ["index.html"] })
      ],
      destinationBucket: siteBucket,
      distribution: this.distribution,
      distributionPaths: ["/*"],
      cacheControl: [
        CacheControl.maxAge(Duration.seconds(604800)),
        CacheControl.setPublic(),
        CacheControl.fromString("immutable")
      ],
      prune: false
    });

    new s3deploy.BucketDeployment(this, "DeployNewIndex", {
      sources: [
        s3deploy.Source.asset(props.codePath, { exclude: ["*", "!index.html"] })
      ],
      destinationBucket: siteBucket,
      distribution: this.distribution,
      distributionPaths: ["/*"],
      cacheControl: [
        CacheControl.setPublic(),
        CacheControl.maxAge(Duration.seconds(0)),
        CacheControl.sMaxAge(Duration.seconds(0))
      ],
      prune: false
    });
  }
}
