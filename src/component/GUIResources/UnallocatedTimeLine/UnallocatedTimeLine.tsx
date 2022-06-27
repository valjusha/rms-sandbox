import { UnallocatedAside } from "@component/GUIResources/UnallocatedTimeLine/UnallocatedAside";
import { UnallocatedGrid } from "@component/GUIResources/UnallocatedTimeLine/UnallocatedGrid";
import AutoSizer from "react-virtualized-auto-sizer";
import { GridProps, } from "react-window";

import "../TimeLine/Timeline.css";

type UnallocatedTimeLineProps = Partial<GridProps>;

export const UnallocatedTimeLine = ({ onScroll }: UnallocatedTimeLineProps) => {
  return (
    <section className="unallocated">
      <UnallocatedAside />
      <div className="unallocated-grid">
        <AutoSizer style={{ height: "100%" }}>
          {({ height, width }) => (
            <UnallocatedGrid
              height={height}
              width={width}
              onScroll={onScroll}
            />
          )}
        </AutoSizer>
      </div>
    </section>
  );
};
