import React, { createContext, useContext } from "react";
import { getWorkingDateRange, ShiftRMSDates } from "@utils/time";

const initial: IDatesShiftContext = getWorkingDateRange();

export type IDatesShiftContext = ShiftRMSDates;

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
