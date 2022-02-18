/**
 * returns ISO 8601 date string
 * For example:
 * ```ts
 * const fiveMinsFromNow = timeFromNow({ unit: "MINUTES", value: 5 });
 * console.log(new Date().toISOString());
 * // 2020-04-20T15:25...
 * console.log(fiveMinsFromNow);
 * // 2020-04-20T15:30...
 * ```
 */
export const timeFromNow = ({
  unit,
  value,
}: {
  unit: 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS' | 'MONTHS' | 'YEARS';
  value: number;
}) => {
  const date = new Date();
  // could be a switch statement but that's too long lol
  if (unit === 'SECONDS') date.setSeconds(date.getSeconds() + value);
  if (unit === 'MINUTES') date.setMinutes(date.getMinutes() + value);
  if (unit === 'HOURS') date.setHours(date.getHours() + value);
  if (unit === 'DAYS') date.setDate(date.getDate() + value);
  if (unit === 'MONTHS') date.setMonth(date.getMonth() + value);
  if (unit === 'YEARS') date.setFullYear(date.getFullYear() + value);

  return date.toISOString();
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const TIME = {
  SECOND,
  MINUTE,
  HOUR,
  DAY,
  WEEK,
  MONTH,
  YEAR,
};
