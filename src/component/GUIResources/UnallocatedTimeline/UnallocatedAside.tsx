import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";

export const UnallocatedAside = () => {
  const { gridBusWidth } = useGUIResourcesContext();

  return (
    <div className="unallocated-aside" style={{ width: `${gridBusWidth}px` }}>
      Незапланированная
    </div>
  );
};
