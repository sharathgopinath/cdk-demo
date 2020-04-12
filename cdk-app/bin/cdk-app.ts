#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkAppStack } from '../lib/cdk-app-stack';
import context from '../helpers/context';

const app = new cdk.App();
const stackName = `${context.getAppName(app)}-stack`;
new CdkAppStack(app, 'CdkAppStack', {
    stackName:stackName,
    tags: {
        'AppName': context.getAppName(app),
        "StackName": stackName
    }
});
