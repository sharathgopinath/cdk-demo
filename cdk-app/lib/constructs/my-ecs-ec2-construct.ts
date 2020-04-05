import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import iam = require('@aws-cdk/aws-iam');
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import cdk = require('@aws-cdk/core');
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from "@aws-cdk/core";

export class MyEcsEc2Construct extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const account = this.node.tryGetContext("Account");
        const appName = this.node.tryGetContext("AppName");
        const imageTag = this.node.tryGetContext("ImageTag");

        const vpc = new ec2.Vpc(this, `${appName}-vpc`, {
            maxAzs: 3 // Default is all AZs in region
        });

        const cluster = new ecs.Cluster(this, `${appName}-cluster`, {
            clusterName: `${appName}-cluster`,
            vpc: vpc
        });

        const taskDefinition = new ecs.FargateTaskDefinition(this, `${appName}-task-def`, {
            cpu: 256,
            family: appName,
            executionRole: iam.Role.fromRoleArn(this, 'EcsExecutionIAMRole', `arn:aws:iam::${account}:role/ecsTaskExecutionRole`),
        });

        const repository = Repository.fromRepositoryName(this, `${appName}-container-repo`, appName)
        const container = taskDefinition.addContainer(`${appName}-container`, {
            image: ecs.ContainerImage.fromEcrRepository(repository, imageTag),
            memoryLimitMiB: 512,
            healthCheck:{
                command: ['curl -fail http://localhost/health || exit 1'],
                interval: Duration.seconds(5),
                retries: 3
            }
        });
        container.addPortMappings({
            containerPort: 80,
            protocol: ecs.Protocol.TCP
        });

        new ecs_patterns.ApplicationLoadBalancedFargateService(this, `${appName}-service`, {
            serviceName: `${appName}-service`,
            cluster: cluster, // Required
            cpu: 512, // Default is 256
            desiredCount: 1, // Default is 1
            taskDefinition: taskDefinition,
            memoryLimitMiB: 512, // Default is 512
            publicLoadBalancer: true // Default is false
          });
    }
}
