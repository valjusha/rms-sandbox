import timelineHeaderStyle from "@component/GUIResources/TimeLine/TimelineHeader.module.css";
import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/context/DatesShift";
import { useTimelineContext } from "@store/context/TimelineProvider";
import { format } from "date-fns";
import React from 'react';

const TimelineHeader = () => {
  const { setHeaderRef, handleHeaderScroll } = useTimelineContext()
  const shifts = useDatesShift();
  const { stepWidth, steps, columnWidth } = useStep30Minute();

  return (
    // todo: перенести компонент в TimelineGrid.innerElementType чтобы избавиться от синхронизации ?
    // Не нравится что в innerElementType будут рендерятся сами элементы для grid и так же header (странная структура)
    <header
      className={timelineHeaderStyle.wrapper}
      style={{ backgroundSize: `${stepWidth}px 100%` }}
    >
      <div
        ref={setHeaderRef}
        className={timelineHeaderStyle.stickyContent}
        onScroll={handleHeaderScroll}
      >
        {shifts.map((day) => (
          <div
            className={timelineHeaderStyle.day}
            key={day.getTime()}
            style={{ width: `${columnWidth}px` }}
          >
            <div className={timelineHeaderStyle.date} style={{ color: "#6b707c" }}>
              {format(day, "dd-MM-yyyy")}
            </div>
            <div className={timelineHeaderStyle.steps}>
              {steps.map((date, index) => (
                <div
                  key={`${index}::${date}`}
                  className={timelineHeaderStyle.timeStep}
                  style={{ width: `${stepWidth}px` }}
                >
                  <span>{date}</span>
                  <div className={timelineHeaderStyle.stepDash} style={{ height: "5px" }} />
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