import { UnallocatedAside } from "@component/GUIResources/UnallocatedTimeLine/UnallocatedAside";
import { UnallocatedGrid } from "@component/GUIResources/UnallocatedTimeLine/UnallocatedGrid";
import AutoSizer from "react-virtualized-auto-sizer";

import "../TimeLine/Timeline.css";

export const UnallocatedTimeLine = () => {
  return (
    <section className="unallocated">
      <UnallocatedAside />
      <div className="unallocated-grid">
        <AutoSizer style={{ height: "100%" }}>
          {({ height, width }) => (
            <UnallocatedGrid
              height={height}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    </section>
  );
};
