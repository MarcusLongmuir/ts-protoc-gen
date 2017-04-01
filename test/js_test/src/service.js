const chai = require("chai");
const assert = chai.assert;
const simple_service_pb_grpc = require("../generated/examplecom/simple_service_pb_grpc");
const simple_service_pb = require("../generated/examplecom/simple_service_pb");
const external_child_message_pb = require("../generated/othercom/external_child_message_pb");

describe("js grpc", () => {
  it("should generate a service definition", () => {
    assert.strictEqual(simple_service_pb_grpc.SimpleService.serviceName, "examplecom.SimpleService");

    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.methodName, "DoUnary");
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.service, simple_service_pb_grpc.SimpleService);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.requestStream, false);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.responseStream, false);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.requestType, simple_service_pb.UnaryRequest);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoUnary.responseType, external_child_message_pb.ExternalChildMessage);

    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.methodName, "DoStream");
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.service, simple_service_pb_grpc.SimpleService);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.requestStream, false);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.responseStream, true);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.requestType, simple_service_pb.StreamRequest);
    assert.strictEqual(simple_service_pb_grpc.SimpleService.DoStream.responseType, external_child_message_pb.ExternalChildMessage);
  });
});
