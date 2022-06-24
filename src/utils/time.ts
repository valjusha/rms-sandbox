import { faker } from "@faker-js/faker/locale/ru";
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

export type ShiftRMSDates = [Date, Date, Date, Date, Date];
export const getWorkingDateRange = (shiftDays: number = 2) => {
  const pushDay = (start: Date, fn: (...arg: any[]) => Date, length: number) =>
    Array.from({ length }, (_, i) => fn(start, ++i)) as [Date, Date];

  const prevDays = pushDay(today, subDays, shiftDays);
  const nextDays = pushDay(today, addDays, shiftDays);

  return [...prevDays, today, ...nextDays] as ShiftRMSDates;
};

export const getFakeRangeInDay = (day: Date = today) => {
  return faker.date.betweens(...getDayDateRange(), 2) as [Date, Date];
};
