import moment from "moment";

export default function formatDate(sentAt) {
  const messageDate = moment(sentAt);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  if (messageDate.isSame(today, "day")) {
    return `Today at ${messageDate.format("HH:mm")}`;
  } else if (messageDate.isSame(yesterday, "day")) {
    return `Yesterday at ${messageDate.format("HH:mm")}`;
  } else {
    return messageDate.format("MMM D, YYYY [at] HH:mm");
  }
}
