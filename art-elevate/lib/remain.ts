// @/lib/date.ts
export function calculatePercentageRemaining(
  days: number,
  hours: number,
  minutes: number,
  seconds: number
): number {
  const totalSeconds =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the total seconds until the provided time
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + days);
  targetDate.setHours(hours, minutes, seconds, 0);
  const remainingSeconds = Math.floor(
    (targetDate.getTime() - currentDate.getTime()) / 1000
  );

  // Calculate the percentage remaining
  const percentageRemaining = (remainingSeconds / totalSeconds) * 100;

  return percentageRemaining;
}
