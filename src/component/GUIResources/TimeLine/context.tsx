import { createContext } from "react";

export const StickyListContext = createContext(null);
StickyListContext.displayName = "StickyListContext";

export const StickyListProvider = () => {
  return <StickyListContext.Provider value={null}></StickyListContext.Provider>;
};
