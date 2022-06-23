import React, { createContext, useContext } from "react";
import { today } from "@utils/time";
import { addDays, subDays } from "date-fns";

const getWorkingDateRange = () => {
  const pushDay = (start: Date, fn: (...arg: any[]) => Date) =>
    Array.from({ length: 2 }, (_, i) => fn(start, ++i)) as [Date, Date];

  const prevDays = pushDay(today, subDays);
  const nextDays = pushDay(today, addDays);

  return [...prevDays, today, ...nextDays] as ResourceDates;
};

const initial: IDatesShiftContext = getWorkingDateRange();

type ResourceDates = [Date, Date, Date, Date, Date];

export type IDatesShiftContext = ResourceDates;

export const DatesShiftContext = createContext<IDatesShiftContext>(initial);

export const DateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <DatesShiftContext.Provider value={initial} children={children} />;
};

export const useDatesShift = () => {
  const context = useContext(DatesShiftContext) as IDatesShiftContext;

  if (context == undefined) {
    throw new Error("useDatesShift must be used within a DateContextProvider");
  }

  return context;
};
