import { IValue, useLocalStorage } from "@hook/useLocalStorage";
import { useTimelineContext } from "@store/TimelineProvider";
import { IGetDivRef, IGetGridRef, IGetRef, ISetDivRef, ISetGridRef, ISetRef, ISize } from "@store/types";
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { GridOnScrollProps, VariableSizeGrid as Grid } from "react-window";

type ISaveSize = (sizes: number[]) => void

type IHandleScroll = (props: GridOnScrollProps) => void

interface IResourcesAreaContext {
  setGridBusRef: ISetGridRef,
  getGridBusRef: IGetGridRef,
  setGridBusInnerRef: ISetRef,
  getGridBusInnerRef: IGetRef,
  setUnallocatedGridRef: ISetGridRef,
  getUnallocatedGridRef: IGetGridRef,
  setRmsRef: ISetDivRef,
  getRmsRef: IGetDivRef,
  gridBusMaxSize: ISize | null,
  gridBusWidth: IValue,
  unallocatedHeight: IValue,
  saveGridBusWidth: ISaveSize,
  saveUnallocatedHeight: ISaveSize,
  handleGridBusScroll: IHandleScroll,
  handleUnallocatedGridScroll: IHandleScroll,
  handleTimelineGridScroll: IHandleScroll
}

const ResourcesAreaContext =
  createContext<IResourcesAreaContext | null>(null);

export const ResourcesAreaProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const rmsRef = useRef<HTMLDivElement | null>(null)
  const gridBusRef = useRef<Grid | null>(null)
  const gridBusInnerRef = useRef<HTMLElement | null>(null)
  const unallocatedGridRef = useRef<Grid | null>(null)

  const [gridBusMaxSize, setGridBusMaxSize] = useState<ISize | null>(null)
  const [gridBusWidth, setGridBusWidth] = useLocalStorage('gridBusWidth', null)

  const [unallocatedHeight, setUnallocatedHeight] = useLocalStorage('unallocatedHeight', null)

  const { getGridRef } = useTimelineContext()

  const setGridBusInnerRef: IResourcesAreaContext["setGridBusInnerRef"] = useCallback((r) => {
    gridBusInnerRef.current = r
    if (r) {
      // 14px - ширина скрола
      setGridBusMaxSize({
        height: r.offsetHeight,
        width: r.offsetWidth + 14
      })
    }
  }, [])

  const getGridBusInnerRef: IResourcesAreaContext["getGridBusInnerRef"] = () => gridBusInnerRef.current

  const setRmsRef: IResourcesAreaContext["setRmsRef"] = (ref) => rmsRef.current = ref

  const getRmsRef: IResourcesAreaContext["getRmsRef"] = () => rmsRef.current

  const setUnallocatedGridRef: IResourcesAreaContext["setUnallocatedGridRef"] =
    (ref) => unallocatedGridRef.current = ref

  const getUnallocatedGridRef: IResourcesAreaContext["getUnallocatedGridRef"] =
    () => unallocatedGridRef.current

  const setGridBusRef: IResourcesAreaContext["setGridBusRef"] = (ref) => gridBusRef.current = ref

  const getGridBusRef: IResourcesAreaContext["getGridBusRef"] = () => gridBusRef.current

  const saveGridBusWidth:ISaveSize = (widths) => {
    if (widths.length === 2) {
      setGridBusWidth(widths[0])
    }
  }

  const saveUnallocatedHeight:ISaveSize = (heights) => {
    if (heights.length === 2) {
      setUnallocatedHeight(heights[1])
    }
  }

  const handleGridBusScroll: IResourcesAreaContext["handleGridBusScroll"] = ({
    scrollTop,
    scrollUpdateWasRequested,
  }) => {
    if (!scrollUpdateWasRequested && getGridRef()) {
      getGridRef()?.scrollTo({ scrollTop });
    }
  };

  const handleUnallocatedGridScroll: IResourcesAreaContext["handleGridBusScroll"] = ({
    scrollLeft,
    scrollUpdateWasRequested
  }) => {
    if (!scrollUpdateWasRequested && getGridRef()) {
      getGridRef()?.scrollTo({ scrollLeft });
    }
  };

  const handleTimelineGridScroll: IResourcesAreaContext["handleGridBusScroll"] = ({
    scrollTop,
    scrollLeft,
    scrollUpdateWasRequested
  }) => {
    if (!scrollUpdateWasRequested && getGridBusRef()) {
      getGridBusRef()?.scrollTo({ scrollTop });
    }
    if (!scrollUpdateWasRequested && getUnallocatedGridRef()) {
      getUnallocatedGridRef()?.scrollTo({ scrollLeft });
    }
  };

  return (
    <ResourcesAreaContext.Provider value={{
      setGridBusRef, getGridBusRef,
      setGridBusInnerRef, getGridBusInnerRef,
      setUnallocatedGridRef, getUnallocatedGridRef,
      setRmsRef, getRmsRef,
      gridBusMaxSize, gridBusWidth, unallocatedHeight,
      saveGridBusWidth, saveUnallocatedHeight,
      handleGridBusScroll, handleUnallocatedGridScroll, handleTimelineGridScroll
    }}>
      {children}
    </ResourcesAreaContext.Provider>
  );
};

export const useGUIResourcesContext = () => {
  const context = useContext(
    ResourcesAreaContext
  ) as IResourcesAreaContext;

  if (context == undefined) {
    throw new Error(
      "useGUIResourcesContext must be used within a ResourceAreaProvider"
    );
  }

  return context;
};
