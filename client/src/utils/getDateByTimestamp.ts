import { dateOptions } from "./dateOptions";

export default function getDateByTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(timestamp));
}
