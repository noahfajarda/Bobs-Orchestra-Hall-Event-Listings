export default function formatDateTime(dateTime: string) {
  var d = new Date(dateTime);

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  let hours: number = d.getUTCHours();
  let minutes: string | number = d.getUTCMinutes();
  let AMPM = "AM";

  // check minutes
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours > 12) {
    hours = hours - 12;
    AMPM = "PM";
  }

  return { month, day, year, hours, minutes, AMPM };
}
