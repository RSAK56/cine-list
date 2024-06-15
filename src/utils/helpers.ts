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

export const generateApiUrl = (
  endpoint: string,
  TMDB_API_KEY: string | undefined,
  params?: Record<string, any>,
) => {
  let url = `https://api.themoviedb.org/3${endpoint}?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

  if (params) {
    Object.keys(params).forEach((key) => {
      url += `&${key}=${params[key]}`;
    });
  }

  return url;
};
