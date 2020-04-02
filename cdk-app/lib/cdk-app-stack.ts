import * as cdk from '@aws-cdk/core';
import { MyEcsEc2Construct } from './constructs/my-ecs-ec2-construct';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new MyEcsEc2Construct(this, "MyEcsEc2Stack");
  }
}
