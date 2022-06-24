import timelineHeaderStyle from "@component/GUIResources/TimeLine/TimelineHeader.module.css";
import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/DatesShift";
import { useTimelineContext } from "@store/TimelineProvider";
import { format } from "date-fns";
import React from 'react';

const TimelineHeader = () => {
  const { setHeaderRef } = useTimelineContext()
  const shifts = useDatesShift();
  const { stepWidth, steps, columnWidth } = useStep30Minute();

  return (
    <header
      ref={setHeaderRef}
      className={timelineHeaderStyle.wrapper}
      style={{ backgroundSize: `${stepWidth}px 100%` }}
    >
      <div className={timelineHeaderStyle.stickyContent}>
        {shifts.map((day) => (
          <div
            className={timelineHeaderStyle.day}
            key={day.getTime()}
            style={{ width: `${columnWidth}px` }}
          >
            <span className={timelineHeaderStyle.date} style={{ color: "#6b707c" }}>
              {format(day, "dd-MM-yyyy")}
            </span>
            <div className={timelineHeaderStyle.steps}>
              {steps.map((date, index) => (
                <div
                  key={`${index}::${date}`}
                  className={timelineHeaderStyle.timeStep}
                  style={{ width: `${stepWidth}px` }}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default TimelineHeader;