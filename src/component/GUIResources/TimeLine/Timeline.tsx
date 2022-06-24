import TimelineGrid from "@component/GUIResources/TimeLine/TimelineGrid";
import TimelineHeader from "@component/GUIResources/TimeLine/TimelineHeader";
import { useTimelineContext } from "@store/TimelineProvider";
import AutoSizer from "react-virtualized-auto-sizer";
import "./Timeline.css";

const Timeline = () => {
  const { setTimelineRef } = useTimelineContext()

  return (
    <section ref={setTimelineRef} className="timeline">
      <TimelineHeader />
      <AutoSizer style={{ width: "100%", height: "100%" }}>
        {({ height, width }) => (
          <TimelineGrid height={height} width={width} />
        )}
      </AutoSizer>
    </section>
  );
};

export default Timeline