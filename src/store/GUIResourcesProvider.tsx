import { IValue, useLocalStorage } from "@hook/useLocalStorage";
import { IGetInnerRef, ISetInnerRef, ISize } from "@store/types";
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

type ISaveSize = (sizes: number[]) => void

interface IGUIResourcesContext {
  setGridBusInnerRef: ISetInnerRef,
  getGridBusInnerRef: IGetInnerRef,
  gridBusMaxSize: ISize | null,
  gridBusWidth: IValue,
  unallocatedHeight: IValue,
  saveGridBusWidth: ISaveSize,
  saveUnallocatedHeight: ISaveSize
}

const GUIResourcesContext =
  createContext<IGUIResourcesContext | null>(null);

export const GUIResourcesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [gridBusMaxSize, setGridBusMaxSize] = useState<ISize | null>(null)
  const innerRef = useRef<HTMLElement | null>(null)

  const [gridBusWidth, setGridBusWidth] = useLocalStorage('gridBusWidth', 0)
  const [unallocatedHeight, setUnallocatedHeight] = useLocalStorage('unallocatedHeight', 0)

  const setGridBusInnerRef: ISetInnerRef = useCallback((r) => {
    innerRef.current = r
    if (r) {
      // 14px - ширина скрола
      setGridBusMaxSize({
        height: r.offsetHeight,
        width: r.offsetWidth + 14
      })
    }
  }, [])

  const getGridBusInnerRef: IGetInnerRef = () => innerRef.current

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
    <GUIResourcesContext.Provider value={{
      setGridBusInnerRef, getGridBusInnerRef,
      gridBusMaxSize, gridBusWidth, unallocatedHeight,
      saveGridBusWidth, saveUnallocatedHeight
    }}>
      {children}
    </GUIResourcesContext.Provider>
  );
};

export const useGUIResourcesContext = () => {
  const context = useContext(
    GUIResourcesContext
  ) as IGUIResourcesContext;

  if (context == undefined) {
    throw new Error(
      "useGUIResourcesContext must be used within a GUIResourcesProvider"
    );
  }

  return context;
};
