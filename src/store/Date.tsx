import React, { createContext, useContext } from "react";
import { today } from "@utils/time";

export interface IDateContext {}

export const DateContext = createContext<IDateContext | null>(null);

export const DateContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <DateContext.Provider value={null} children={children} />;
};

export const useDate = () => {
  const context = useContext(DateContext) as IDateContext;

  if (context == undefined) {
    throw new Error("useDate must be used within a DateContextProvider");
  }

  return context;
};

/**
 * [Date, Date, Date]
 * resources: [
    {
      resourceData: {},
      items: {}[]
    }
 * ]
 */
