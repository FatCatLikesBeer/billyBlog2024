export default function formatTimeStamp(timeStamp: string) {
  const date = new Date(timeStamp);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
