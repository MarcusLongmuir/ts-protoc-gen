const chai = require("chai");
const assert = chai.assert;
const parent_message_v3_pb = require("../generated/examplecom/parent_message_v3_pb");
const ParentMessageV3 = parent_message_v3_pb.ParentMessageV3;
const external_child_message_pb = require("../generated/othercom/external_child_message_pb");
const ExternalChildMessage = external_child_message_pb.ExternalChildMessage;
const InternalChildMessage = ParentMessageV3.InternalChildMessage;

describe("proto3 - external nested messages", () => {
  it("should allow getting external message fields on an empty message", () => {
    const parentMsg = new ParentMessageV3();
    assert.strictEqual(parentMsg.getExternalChildMessage(), undefined);
    assert.deepEqual(parentMsg.getExternalChildrenList(), []);
  });

  it("should allow setting and getting external message fields", () => {
    const parentMsg = new ParentMessageV3();
    const childMsg = new ExternalChildMessage();
    childMsg.setMyString("hello world");
    parentMsg.setExternalChildMessage(childMsg);
    assert.strictEqual(parentMsg.getExternalChildMessage().getMyString(), "hello world");

    parentMsg.setExternalChildMessage(undefined);
    assert.strictEqual(parentMsg.getExternalChildMessage(), undefined);
  });

  it("should allow setting and getting repeated external message fields", () => {
    const parentMsg = new ParentMessageV3();
    const childMsgOne = new ExternalChildMessage();
    childMsgOne.setMyString("one");

    const childMsgTwo = new ExternalChildMessage();
    childMsgTwo.setMyString("two");

    parentMsg.setExternalChildrenList([childMsgOne, childMsgTwo]);

    assert.deepEqual(parentMsg.getExternalChildrenList(), [childMsgOne, childMsgTwo]);
  });
});

describe("proto3 - toObject", () => {
  it("should indicate potentially undefined message fields", () => {
    const parentMsg = new ParentMessageV3();
    const asObjectUnset = parentMsg.toObject();
    assert.strictEqual(asObjectUnset.internalChildMessage, undefined);
    const childMsg = new InternalChildMessage();
    childMsg.setMyString("hello world");
    parentMsg.setInternalChildMessage(childMsg);
    const asObjectSet = parentMsg.toObject();
    assert.strictEqual(asObjectSet.internalChildMessage.myString, "hello world");
  });
  it("should indicate potentially undefined primitive fields", () => {
    const msg = new InternalChildMessage();
    const asObjectUnset = msg.toObject();
    assert.strictEqual(asObjectUnset.myString, "");
    msg.setMyString("hello world");
    const asObjectSet = msg.toObject();
    assert.strictEqual(asObjectSet.myString, "hello world");
  });
});
