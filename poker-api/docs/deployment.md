# Deployment

Deployment to your AWS account can be done by first ensuring your account `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are exposed via environment variables by running either `export AWS_ACCESS_KEY_ID=${YOUR_ACCESS_KEY}` and `export AWS_SECRET_ACCESS_KEY=$YOUR_SECRET_ACCESS_KEY}`, or `aws configure` in your terminal, or by exposing them directly in the `.aws/credentials` file.
  
## Deploying with Serverless

Each service must define its own `serverless.yml` file. In this file, the AWS lambda functions which you want to deploy are defined.
 
To deploy your service, run `sls deploy --stage dev` in your service directory.