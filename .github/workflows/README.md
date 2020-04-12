# Github workflow to build and deploy to AWS

## deploy-full.yml

Builds docker image, Uploads image to ECR and deploys to ECS

## IAM policies required for github user

Below are the IAM policies that was required to deploy this project. In a production scenario however, it is recommended that the Resource property is restricted further instead of '*'

- Upload image to ECR
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DeployToECR",
            "Effect": "Allow",
            "Action": [
                "ecr:GetAuthorizationToken",
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload"
            ],
            "Resource": "*"
        }
    ]
}
```

- Deploy to ECS
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "RegisterTaskDefinition",
            "Effect": "Allow",
            "Action": [
                "ecs:RegisterTaskDefinition"
            ],
            "Resource": "*"
        },
        {
            "Sid": "PassRolesInTaskDefinition",
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": "*"
        },
        {
            "Sid": "DeployService",
            "Effect": "Allow",
            "Action": [
                "ecs:UpdateService",
                "ecs:DescribeServices",
                "ecs:CreateService"
            ],
            "Resource": "*"
        },
        {
            "Sid": "DeployToECS",
            "Effect": "Allow",
            "Action": [
                "lambda:CreateFunction",
                "ec2:CreateDhcpOptions",
                "ec2:AuthorizeSecurityGroupIngress",
                "elasticloadbalancing:ModifyListener",
                "ec2:DescribeInstances",
                "ec2:ReplaceRouteTableAssociation",
                "iam:ListRoleTags",
                "ec2:DeleteVpcEndpoints",
                "lambda:GetFunctionConfiguration",
                "ec2:AttachInternetGateway",
                "cloudformation:CreateChangeSet",
                "iam:PutRolePolicy",
                "route53:ListHostedZonesByName",
                "ec2:UpdateSecurityGroupRuleDescriptionsIngress",
                "ec2:DeleteRouteTable",
                "ec2:DeleteVpnGateway",
                "ec2:CreateNetworkInterfacePermission",
                "ec2:RevokeSecurityGroupEgress",
                "ec2:CreateRoute",
                "ec2:CreateInternetGateway",
                "lambda:DeleteFunction",
                "ec2:DeleteInternetGateway",
                "ec2:UnassignPrivateIpAddresses",
                "iam:ListRolePolicies",
                "ec2:DescribeKeyPairs",
                "iam:GetRole",
                "ec2:CreateTags",
                "ec2:DescribeVpcClassicLinkDnsSupport",
                "ec2:ModifyNetworkInterfaceAttribute",
                "elasticloadbalancing:CreateTargetGroup",
                "iam:DeleteRole",
                "ec2:AssignPrivateIpAddresses",
                "ec2:DisassociateRouteTable",
                "ec2:ReplaceNetworkAclAssociation",
                "ec2:CreateVpcEndpointServiceConfiguration",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:CreateNetworkInterface",
                "ec2:DetachVpnGateway",
                "ec2:DescribeVpcEndpointServicePermissions",
                "ec2:CreateDefaultVpc",
                "ec2:DeleteDhcpOptions",
                "ec2:DeleteNatGateway",
                "ec2:DescribeSubnets",
                "ec2:CreateSubnet",
                "iam:GetRolePolicy",
                "ec2:ModifyVpcEndpoint",
                "ec2:DeleteNetworkAclEntry",
                "ec2:CreateVpnConnection",
                "ec2:DisassociateAddress",
                "ec2:DescribeMovingAddresses",
                "ec2:ModifyVpcEndpointServicePermissions",
                "iam:UntagRole",
                "ec2:MoveAddressToVpc",
                "ec2:CreateNatGateway",
                "iam:TagRole",
                "ec2:DescribeFlowLogs",
                "ec2:DescribeRegions",
                "ec2:CreateVpc",
                "ec2:DescribeVpcEndpointServices",
                "ec2:DescribeVpcAttribute",
                "ec2:ModifySubnetAttribute",
                "ecs:DeregisterTaskDefinition",
                "iam:PassRole",
                "ec2:CreateDefaultSubnet",
                "ec2:DescribeAvailabilityZones",
                "iam:DeleteRolePolicy",
                "ec2:DescribeNetworkInterfaceAttribute",
                "ec2:DescribeVpcEndpointConnections",
                "ec2:DeleteNetworkAcl",
                "ec2:ReleaseAddress",
                "ec2:AssociateDhcpOptions",
                "ec2:AssignIpv6Addresses",
                "ec2:AttachVpnGateway",
                "ec2:AcceptVpcEndpointConnections",
                "ec2:DescribeClassicLinkInstances",
                "ec2:CreateVpnConnectionRoute",
                "ec2:DisassociateSubnetCidrBlock",
                "ec2:DescribeVpcEndpointConnectionNotifications",
                "ec2:DescribeSecurityGroups",
                "ec2:DeleteVpcEndpointConnectionNotifications",
                "ec2:RestoreAddressToClassic",
                "ec2:DeleteCustomerGateway",
                "ec2:DescribeVpcs",
                "ec2:EnableVgwRoutePropagation",
                "ec2:DisableVpcClassicLink",
                "ec2:DisableVpcClassicLinkDnsSupport",
                "ec2:ModifyVpcTenancy",
                "ec2:DescribeStaleSecurityGroups",
                "ec2:DeleteFlowLogs",
                "ec2:DeleteSubnet",
                "ec2:ModifyVpcEndpointServiceConfiguration",
                "ec2:DetachClassicLinkVpc",
                "ec2:DeleteVpcPeeringConnection",
                "ec2:AcceptVpcPeeringConnection",
                "route53:GetHostedZone",
                "iam:CreateRole",
                "iam:AttachRolePolicy",
                "ec2:DisableVgwRoutePropagation",
                "ec2:AssociateVpcCidrBlock",
                "ec2:ReplaceRoute",
                "ec2:RejectVpcPeeringConnection",
                "ec2:AssociateRouteTable",
                "ec2:DisassociateVpcCidrBlock",
                "ec2:DescribeInternetGateways",
                "elasticloadbalancing:DescribeLoadBalancers",
                "ecs:UpdateService",
                "iam:DetachRolePolicy",
                "iam:ListAttachedRolePolicies",
                "ec2:ReplaceNetworkAclEntry",
                "ecs:RegisterTaskDefinition",
                "ec2:ModifyVpcPeeringConnectionOptions",
                "ec2:CreateVpnGateway",
                "route53:ListResourceRecordSets",
                "ec2:DescribeAccountAttributes",
                "ec2:UnassignIpv6Addresses",
                "ec2:DescribeNetworkInterfacePermissions",
                "ec2:DeleteVpnConnection",
                "cloudformation:ExecuteChangeSet",
                "ec2:CreateVpcPeeringConnection",
                "ec2:RejectVpcEndpointConnections",
                "ec2:DescribeNetworkAcls",
                "ec2:DescribeRouteTables",
                "ec2:EnableVpcClassicLink",
                "ec2:DescribeEgressOnlyInternetGateways",
                "ec2:UpdateSecurityGroupRuleDescriptionsEgress",
                "ec2:CreateVpcEndpointConnectionNotification",
                "lambda:InvokeFunction",
                "ec2:DescribeVpnConnections",
                "ec2:DescribeVpcPeeringConnections",
                "ecs:CreateCluster",
                "ecs:DeleteCluster",
                "ec2:ResetNetworkInterfaceAttribute",
                "ec2:CreateRouteTable",
                "ec2:DeleteNetworkInterface",
                "route53:ChangeResourceRecordSets",
                "ec2:DetachInternetGateway",
                "ec2:CreateCustomerGateway",
                "ec2:DescribeVpcEndpointServiceConfigurations",
                "ec2:DescribePrefixLists",
                "logs:CreateLogGroup",
                "ec2:ModifyVpcEndpointConnectionNotification",
                "ec2:DescribeVpcClassicLink",
                "ecs:DescribeClusters",
                "ec2:CreateFlowLogs",
                "ec2:AssociateSubnetCidrBlock",
                "ec2:DeleteVpc",
                "ec2:CreateEgressOnlyInternetGateway",
                "ec2:DescribeVpcEndpoints",
                "ec2:AssociateAddress",
                "ec2:DescribeVpnGateways",
                "ec2:DescribeAddresses",
                "ec2:DeleteTags",
                "route53:GetChange",
                "ec2:DescribeDhcpOptions",
                "ec2:DeleteVpcEndpointServiceConfigurations",
                "cloudformation:DeleteChangeSet",
                "ec2:DeleteNetworkInterfacePermission",
                "ec2:DescribeNetworkInterfaces",
                "ec2:CreateSecurityGroup",
                "ec2:CreateNetworkAcl",
                "ec2:ModifyVpcAttribute",
                "ecs:DescribeServices",
                "ec2:AuthorizeSecurityGroupEgress",
                "ec2:AttachClassicLinkVpc",
                "ec2:DeleteEgressOnlyInternetGateway",
                "ec2:DetachNetworkInterface",
                "lambda:GetFunction",
                "ec2:DescribeTags",
                "ec2:DeleteRoute",
                "elasticloadbalancing:*",
                "ec2:DescribeNatGateways",
                "ec2:DescribeCustomerGateways",
                "ec2:AllocateAddress",
                "ec2:DeleteVpnConnectionRoute",
                "ec2:DescribeSecurityGroupReferences",
                "ec2:CreateVpcEndpoint",
                "ec2:DeleteSecurityGroup",
                "ec2:AttachNetworkInterface",
                "ec2:EnableVpcClassicLinkDnsSupport",
                "ec2:CreateNetworkAclEntry",
                "ecs:DeleteService"
            ],
            "Resource": "*"
        }
    ]
}
```

- Cloudformation
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "cloudformation:*"
            ],
            "Resource": "*"
        }
    ]
}
```