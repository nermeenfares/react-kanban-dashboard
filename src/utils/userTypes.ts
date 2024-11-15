//comment to reviewer: I was ggoing to use itt but then changed the logic, I left it here since i may get back to it, so for now this fn is not used
import { Member } from "../context/MemberContext";

export const filterUsersByStatus = (
  users: Member[],
  status: Member["status"]
) => {
  const validStatuses: Member["status"][] = [
    "Unclaimed",
    "First Contact",
    "Preparing Work Offer",
    "Send to Therapist",
  ];

  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  return users.filter((user) => user.status === status);
};
