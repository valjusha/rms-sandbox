import { IValue, useLocalStorage } from "@hook/useLocalStorage";
import { IGetGridRef, IGetRef, ISetGridRef, ISetRef, ISize } from "@store/types";
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from "react-window";

type ISaveSize = (sizes: number[]) => void

interface IResourcesAreaContext {
  setGridBusRef: ISetGridRef,
  getGridBusRef: IGetGridRef,
  setGridBusInnerRef: ISetRef,
  getGridBusInnerRef: IGetRef,
  setUnallocatedGridRef: ISetGridRef,
  getUnallocatedGridRef: IGetGridRef,
  gridBusMaxSize: ISize | null,
  gridBusWidth: IValue,
  unallocatedHeight: IValue,
  saveGridBusWidth: ISaveSize,
  saveUnallocatedHeight: ISaveSize
}

const ResourcesAreaContext =
  createContext<IResourcesAreaContext | null>(null);

export const ResourcesAreaProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const gridBusRef = useRef<Grid | null>(null)
  const gridBusInnerRef = useRef<HTMLElement | null>(null)
  const unallocatedGridRef = useRef<Grid | null>(null)
  const [gridBusMaxSize, setGridBusMaxSize] = useState<ISize | null>(null)

  const [gridBusWidth, setGridBusWidth] = useLocalStorage('gridBusWidth', null)
  const [unallocatedHeight, setUnallocatedHeight] = useLocalStorage('unallocatedHeight', null)

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

  const setGridBusRef: IResourcesAreaContext["setGridBusRef"] = (ref) => gridBusRef.current = ref
  const getGridBusRef: IResourcesAreaContext["getGridBusRef"] = () => gridBusRef.current

  const setUnallocatedGridRef: IResourcesAreaContext["setUnallocatedGridRef"] =
    (ref) => unallocatedGridRef.current = ref
  const getUnallocatedGridRef: IResourcesAreaContext["getUnallocatedGridRef"] =
    () => unallocatedGridRef.current

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

  return (
    <ResourcesAreaContext.Provider value={{
      setGridBusRef, getGridBusRef,
      setGridBusInnerRef, getGridBusInnerRef,
      setUnallocatedGridRef, getUnallocatedGridRef,
      gridBusMaxSize, gridBusWidth, unallocatedHeight,
      saveGridBusWidth, saveUnallocatedHeight
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
