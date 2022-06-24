import TimelineGrid from "@component/GUIResources/TimeLine/TimelineGrid";
import TimelineHeader from "@component/GUIResources/TimeLine/TimelineHeader";
import { useTimelineContext } from "@store/TimelineProvider";
import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { GridProps } from "react-window";
import "./Timeline.css";

const Timeline: React.FC<{
  onGridScroll: GridProps["onScroll"]
}> = ({ onGridScroll }) => {
  const { setTimelineRef } = useTimelineContext()

  return (
    <section ref={setTimelineRef} className="timeline">
      <TimelineHeader />
      <AutoSizer style={{ width: "100%", height: "100%" }}>
        {({ height, width }) => (
          <TimelineGrid height={height} width={width} onScroll={onGridScroll} />
        )}
      </AutoSizer>
    </section>
  );
};

export default Timeline