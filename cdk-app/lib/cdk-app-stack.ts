import * as cdk from '@aws-cdk/core';
import { MyEcsConstruct } from './constructs/my-ecs-construct';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new MyEcsConstruct(this, "MyEcsStack");
  }
}
