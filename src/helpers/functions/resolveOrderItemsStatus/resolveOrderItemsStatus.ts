export type Status = "pending" | "accepted" | "rejected";
type ReturnStatus = "mixed" | "accepted" | "rejected" | "pending";

const resolveOrderItemsStatus = (statusArray: Status[]): ReturnStatus => {
  if (statusArray.every((val) => val === "pending")) return "pending";
  if (statusArray.every((val) => val === "accepted")) return "accepted";
  if (statusArray.every((val) => val === "rejected")) return "rejected";
  return "mixed";
};

export default resolveOrderItemsStatus;
