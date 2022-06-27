import { UnallocatedAside } from "@component/GUIResources/UnallocatedTimeline/UnallocatedAside";
import { UnallocatedGrid } from "@component/GUIResources/UnallocatedTimeline/UnallocatedGrid";
import AutoSizer from "react-virtualized-auto-sizer";

import "../TimeLine/Timeline.css";

export const UnallocatedTimeline = () => {
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
