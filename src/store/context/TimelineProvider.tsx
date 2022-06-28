import {
  IGetDivRef,
  IGetGridRef,
  IGetRef,
  IHandleGridScroll,
  IHandleRefScroll,
  ISetDivRef,
  ISetGridRef,
  ISetRef
} from "@store/types";
import React, { createContext, useContext, useRef } from 'react';
import { VariableSizeGrid as Grid } from "react-window";

/**
 * Хранилише состояний компонентов: Timeline, TimelineGrid, TimelineHeader
 */
interface ITimelineContext {
  setTimelineRef: ISetRef,
  getTimelineRef: IGetRef,
  setHeaderRef: ISetDivRef,
  getHeaderRef: IGetDivRef,
  setGridRef: ISetGridRef,
  getGridRef: IGetGridRef,
  handleHeaderScroll: IHandleRefScroll<HTMLDivElement>,
  handleGridScroll: IHandleGridScroll
}

const TimelineContext =
  createContext<ITimelineContext | null>(null);

export const TimelineProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const timelineRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const gridRef = useRef<Grid | null>(null)

  const setTimelineRef: ITimelineContext["setTimelineRef"] = (ref) => timelineRef.current = ref
  const getTimelineRef: ITimelineContext["getTimelineRef"] = () => timelineRef.current

  const setHeaderRef: ITimelineContext["setHeaderRef"] = (ref) => headerRef.current = ref
  const getHeaderRef: ITimelineContext["getHeaderRef"] = () => headerRef.current

  const setGridRef: ITimelineContext["setGridRef"] = (ref) => gridRef.current = ref
  const getGridRef: ITimelineContext["getGridRef"] = () => gridRef.current

  const handleHeaderScroll: ITimelineContext["handleHeaderScroll"] = (event) => {
    if (getGridRef()) {
      getGridRef()!.scrollTo({ scrollLeft: event.currentTarget.scrollLeft })
    }
  }

  const handleGridScroll: ITimelineContext["handleGridScroll"] = ({
    scrollLeft,
    scrollUpdateWasRequested
  }) => {
    if (!scrollUpdateWasRequested && getHeaderRef()) {
      getHeaderRef()!.scrollLeft = scrollLeft
    }
  }

  return (
    <TimelineContext.Provider value={{
      setTimelineRef,
      getTimelineRef,
      setHeaderRef,
      getHeaderRef,
      setGridRef,
      getGridRef,
      handleHeaderScroll,
      handleGridScroll
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