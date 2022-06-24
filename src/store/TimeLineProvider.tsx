import { useFakeResourceRecord } from "@store/FakeResourceRecord";
import { IGetInnerRef, IGetRef, ISetInnerRef, ISetRef, ISize } from "@store/types";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from "react-window";

interface ITimeLineContext {
  setRef: ISetRef,
  getRef: IGetRef,
  setInnerRef: ISetInnerRef,
  getInnerRef: IGetInnerRef,
  maxSize: ISize | null
}

const TimeLineContext =
  createContext<ITimeLineContext | null>(null);

export const TimeLineProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const ref = useRef<Grid | null>(null)
  const innerRef = useRef<HTMLElement | null>(null)
  const [maxSize, setMaxSize] = useState<ISize | null>(null)
  const { resourceRows } = useFakeResourceRecord()

  const setRef: ISetRef = (r) => ref.current = r

  const getRef: IGetRef = () => ref.current

  const setInnerRef: ISetInnerRef = useCallback((r) => {
    if (!r) return;
    innerRef.current = r
    setMaxSize({
      height: r.offsetHeight,
      width: r.offsetWidth
    })
  }, [])

  useEffect(() => {
    if (innerRef.current) {
      setMaxSize({
        height: innerRef.current?.offsetHeight,
        width: innerRef.current?.offsetWidth
      })
    }
  }, [resourceRows])

  const getInnerRef: IGetInnerRef = () => innerRef.current

  return (
    <TimeLineContext.Provider value={{ setRef, getRef, setInnerRef, getInnerRef, maxSize }}>
      {children}
    </TimeLineContext.Provider>
  );
};

export const useTimeLineContext = () => {
  const context = useContext(
    TimeLineContext
  ) as ITimeLineContext;

  if (context == undefined) {
    throw new Error(
      "useTimeLineContext must be used within a TimeLineProvider"
    );
  }

  return context;
};