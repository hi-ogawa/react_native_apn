require "aws-sdk"
require "pry"

sns = Aws::SNS::Client.new(region: "ap-northeast-1")

# NOTE: create endpoint for device for the first time
# ep = sns.create_platform_endpoint(
#   platform_application_arn: "arn:aws:sns:ap-northeast-1:335764714763:app/APNS_SANDBOX/aws-sns-apns-test",
#   token: ENV["DEVICE_TOKEN"]
# )

eps = sns.list_endpoints_by_platform_application(
  platform_application_arn: "arn:aws:sns:ap-northeast-1:335764714763:app/APNS_SANDBOX/aws-sns-apns-test"
)
ep = eps[0][0]

payload = {aps: {alert: "coming from AWSSSSSS", sound: true, badge: 10}}

sns.publish(
  target_arn: ep.endpoint_arn,
  message: {default: "default-hello", APNS_SANDBOX: payload.to_json, APNS: payload.to_json}.to_json,
  message_structure: "json"
)
