import resolveOrderItemsStatus, { Status } from "./resolveOrderItemsStatus";

const pendingArrayMokes: Status[] = [
  "pending",
  "pending",
  "pending",
  "pending",
];
const mixedArrayMokes: Status[] = [
  "pending",
  "accepted",
  "pending",
  "rejected",
];
const acceptedArrayMokes: Status[] = [
  "accepted",
  "accepted",
  "accepted",
  "accepted",
];

describe("resolveOrderItemsStatus", () => {
  it("return pending when all array values are pending", () => {
    expect(resolveOrderItemsStatus(pendingArrayMokes)).toEqual("pending");
  });
  it("return mixed when all array values are mixed", () => {
    expect(resolveOrderItemsStatus(mixedArrayMokes)).toEqual("mixed");
  });
  it("return accepted when all array values are accepted", () => {
    expect(resolveOrderItemsStatus(acceptedArrayMokes)).toEqual("accepted");
  });
});
