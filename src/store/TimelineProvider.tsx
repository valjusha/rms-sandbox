import { IGetGridRef, IGetRef, ISetGridRef, ISetRef } from "@store/types";
import React, { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from "react-window";

/**
 * Хранилише состояний компонентов: Timeline, TimelineGrid, TimelineHeader
 */
interface ITimelineContext {
  setTimelineRef: ISetRef,
  getTimelineRef: IGetRef,
  setHeaderRef: ISetRef,
  getHeaderRef: IGetRef,
  setGridRef: ISetGridRef,
  getGridRef: IGetGridRef
}

const TimelineContext =
  createContext<ITimelineContext | null>(null);

export const TimelineProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const timelineRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const gridRef = useRef<Grid | null>(null)

  const setTimelineRef: ITimelineContext["setTimelineRef"] = (ref) => timelineRef.current = ref
  const getTimelineRef: ITimelineContext["getTimelineRef"] = () => timelineRef.current

  const setHeaderRef: ITimelineContext["setHeaderRef"] = (ref) => headerRef.current = ref
  const getHeaderRef: ITimelineContext["getHeaderRef"] = () => headerRef.current

  const setGridRef: ITimelineContext["setGridRef"] = (ref) => gridRef.current = ref
  const getGridRef: ITimelineContext["getGridRef"] = () => gridRef.current

  return (
    <TimelineContext.Provider value={{
      setTimelineRef,
      getTimelineRef,
      setHeaderRef,
      getHeaderRef,
      setGridRef,
      getGridRef
    }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = useContext(
    TimelineContext
  ) as ITimelineContext;

  if (context == undefined) {
    throw new Error(
      "useTimelineContext must be used within a TimelineProvider"
    );
  }

  return context;
};