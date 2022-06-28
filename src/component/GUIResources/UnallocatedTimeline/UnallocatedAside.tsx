import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import React from 'react';

export const UnallocatedAside = () => {
  const { gridBusWidth } = useGUIResourcesContext();

  return (
    <div
      className="unallocated-aside"
      style={{ width: `${gridBusWidth}px` }}
    >
      Незапланированная
    </div>
  );
};
