import { startOfDay, endOfDay, addDays, subDays } from "date-fns";

export const today = startOfDay(new Date());

export const getDayTime = (date: Date = today) =>
  endOfDay(date).getTime() - startOfDay(date).getTime();

export const getMinutesInDay = Math.ceil(getDayTime() / 1000 / 60);

const getDayDateRange = (date: Date = today): [Date, Date] => [
  endOfDay(date),
  startOfDay(date),
];

export const getWorkingDateRange = () => {
  const pushDay = (start: Date, fn: Function, r: number) =>
    Array.from({ length: r }, (_, i) => fn(start, ++i));

  const prevDays = pushDay(today, subDays, 2);
  const nextDays = pushDay(today, addDays, 2);

  return [...prevDays, today, ...nextDays];
};

export const getRandomWorkShift = (day: Date = today): [Date, Date] => {
  const [from, to] = getDayDateRange(day);

  const first =
      from.getTime() + Math.random() * (to.getTime() - from.getTime()),
    second = from.getTime() + Math.random() * (to.getTime() - from.getTime());

  return [first, second].sort().map((date) => new Date(date)) as [Date, Date];
};
