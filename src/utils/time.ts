import { startOfDay, endOfDay, addDays, subDays } from "date-fns";

export const minWidth = 17;
export const today = startOfDay(new Date());

export const getDayTime = (date: Date = today) =>
  endOfDay(date).getTime() - startOfDay(date).getTime();

export const getMinutesInDay = Math.ceil(getDayTime() / 1000 / 60);

export const getDayDateRange = (date: Date = today): [Date, Date] => [
  startOfDay(date),
  endOfDay(date),
];

export const getRandomWorkShift = (day: Date = today): [Date, Date] => {
  const [from, to] = getDayDateRange(day);

  const first =
      from.getTime() + Math.random() * (to.getTime() - from.getTime()),
    second = from.getTime() + Math.random() * (to.getTime() - from.getTime());

  return [first, second].sort().map((date) => new Date(date)) as [Date, Date];
};
