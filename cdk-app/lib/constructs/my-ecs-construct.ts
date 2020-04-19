import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import iam = require('@aws-cdk/aws-iam');
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import cdk = require('@aws-cdk/core');
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from "@aws-cdk/core";
import context from '../../helpers/context';
import {ApplicationLoadBalancer} from '@aws-cdk/aws-elasticloadbalancingv2';

export class MyEcsConstruct extends cdk.Construct {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id);

        const account = context.getAccount(this);
        const appName = context.getAppName(this);
        const imageTag = context.getImageTag(this);

        const vpc = new ec2.Vpc(this, `${appName}-vpc`, {
            maxAzs: 3 // Default is all AZs in region
        });

        const cluster = new ecs.Cluster(this, `${appName}-cluster`, {
            clusterName: `${appName}-cluster`,
            vpc: vpc,
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
                interval: Duration.seconds(10),
                retries: 10
            }
        });
        container.addPortMappings({
            containerPort: 80,
            hostPort: 80,
            protocol: ecs.Protocol.TCP
        });

        const fargateService = new ecs.FargateService(this, `${appName}-service`, {
            cluster: cluster,
            taskDefinition: taskDefinition,
            desiredCount: 1,
            serviceName: `${appName}-service`
        });

        const lb = new ApplicationLoadBalancer(this, `${appName}-lb`, {
            vpc: vpc,
            internetFacing: true,
            loadBalancerName: `${appName}-lb`
        });
        const listener = lb.addListener(`${appName}-public-listener`, {
            port: 80
        });
          
        listener.addTargets(`${appName}-targets`, {
            targets: [fargateService],
            port: 80,
            healthCheck: {
                path: '/health',
            }
        })
    }
}
