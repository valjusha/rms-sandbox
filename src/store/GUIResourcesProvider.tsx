import { IGetInnerRef, ISetInnerRef, ISize } from "@store/types";
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface IGUIResourcesContext {
  setGridBusInnerRef: ISetInnerRef,
  getGridBusInnerRef: IGetInnerRef,
  gridBusSize: ISize | null
}

const GUIResourcesContext =
  createContext<IGUIResourcesContext | null>(null);

export const GUIResourcesProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [gridBusSize, setGridBusSize] = useState<ISize | null>(null)
  const innerRef = useRef<HTMLElement | null>(null)

  const setGridBusInnerRef: ISetInnerRef = useCallback((r) => {
    innerRef.current = r
    if (r) {
      setGridBusSize({
        height: r.offsetHeight,
        width: r.offsetWidth
      })
    }
  }, [])

  const getGridBusInnerRef: IGetInnerRef = () => innerRef.current

  return (
    <GUIResourcesContext.Provider value={{ setGridBusInnerRef, getGridBusInnerRef, gridBusSize }}>
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
