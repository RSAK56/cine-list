export const formatRuntime = (minutes: number) => {
  if (!minutes || isNaN(minutes)) {
    return "00:00:00";
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  // Format hours, minutes, and seconds to two-digit strings with leading zeroes if needed
  const hoursFormatted = hours.toString().padStart(2, "0");
  const minutesFormatted = remainingMinutes.toString().padStart(2, "0");
  const secondsFormatted = "00";

  return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
};
