import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import iam = require('@aws-cdk/aws-iam');
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import cdk = require('@aws-cdk/core');
import { Repository } from '@aws-cdk/aws-ecr';

export class MyEcsEc2Construct extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const vpc = new ec2.Vpc(this, "MyVpc", {
            maxAzs: 3 // Default is all AZs in region
        });

        const cluster = new ecs.Cluster(this, "MyCluster", {
            vpc: vpc
        });

        const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
            cpu: 256,
            executionRole: iam.Role.fromRoleArn(this, 'EcsExecutionIAMRole', 'arn:aws:iam::253347999681:role/ecsTaskExecutionRole'),
        });

        const repository = Repository.fromRepositoryName(this, 'EcrRepository', "cdk-demo")
        const container = taskDefinition.addContainer('DefaultContainer', {
            image: ecs.ContainerImage.fromEcrRepository(repository, "latest"),
            memoryLimitMiB: 512,
        });
        container.addPortMappings({
            containerPort: 80,
            protocol: ecs.Protocol.TCP
        });

        new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
            cluster: cluster, // Required
            cpu: 512, // Default is 256
            desiredCount: 1, // Default is 1
            taskDefinition: taskDefinition,
            memoryLimitMiB: 512, // Default is 512
            publicLoadBalancer: true // Default is false
          });
    }
}
