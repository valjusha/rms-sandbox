import { IValue, useLocalStorage } from "@hook/useLocalStorage";
import { IGetInnerRef, ISetInnerRef, ISize } from "@store/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type ISaveSize = (sizes: number[]) => void;

interface IResourcesAreaContext {
  setGridBusInnerRef: ISetInnerRef;
  getGridBusInnerRef: IGetInnerRef;
  gridBusMaxSize: ISize | null;
  gridBusWidth: IValue;
  unallocatedHeight: IValue;
  saveGridBusWidth: ISaveSize;
  saveUnallocatedHeight: ISaveSize;
}

const ResourcesAreaContext = createContext<IResourcesAreaContext | null>(null);

export const ResourcesAreaProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [gridBusMaxSize, setGridBusMaxSize] = useState<ISize | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);

  const [gridBusWidth, setGridBusWidth] = useLocalStorage("gridBusWidth", null);
  const [unallocatedHeight, setUnallocatedHeight] = useLocalStorage(
    "unallocatedHeight",
    null
  );

  const setGridBusInnerRef: ISetInnerRef = useCallback((r) => {
    innerRef.current = r;
    if (r) {
      // 14px - ширина скрола
      setGridBusMaxSize({
        height: r.offsetHeight,
        width: 380, // r.offsetWidth + 14 todo ????
      });
    }
  }, []);

  const getGridBusInnerRef: IGetInnerRef = () => innerRef.current;

  const saveGridBusWidth: ISaveSize = (widths) => {
    if (widths.length === 2) {
      setGridBusWidth(widths[0]);
    }
  };

  const saveUnallocatedHeight: ISaveSize = (heights) => {
    if (heights.length === 2) {
      setUnallocatedHeight(heights[1]);
    }
  };

  return (
    <ResourcesAreaContext.Provider
      value={{
        setGridBusInnerRef,
        getGridBusInnerRef,
        gridBusMaxSize,
        gridBusWidth,
        unallocatedHeight,
        saveGridBusWidth,
        saveUnallocatedHeight,
      }}
    >
      {children}
    </ResourcesAreaContext.Provider>
  );
};

export const useGUIResourcesContext = () => {
  const context = useContext(ResourcesAreaContext) as IResourcesAreaContext;

  if (context == undefined) {
    throw new Error(
      "useGUIResourcesContext must be used within a ResourceAreaProvider"
    );
  }

  return context;
};
