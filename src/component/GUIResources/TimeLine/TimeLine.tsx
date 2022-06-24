import {
  IFakeResourceRecord,
  useFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { useTimeLineContext } from "@store/TimeLineProvider";
import { getDayDateRange, getMinutesInDay, minWidth } from "@utils/time";
import { forwardRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  GridChildComponentProps,
  GridProps,
  VariableSizeGrid as Grid,
} from "react-window";

import "./TimeLine.css";
import timeStepStyle from "./TimeStep.module.css";
import { useDatesShift } from "@store/DatesShift";
import { format, addMinutes, endOfQuarter } from "date-fns";

type TimeLineProps = Partial<GridProps>;

const useStep30Minute = (): {
  stepWidth: number;
  steps: string[];
  columnWidth: number;
} => {
  let [start, end] = getDayDateRange();
  const stepMinute = 30,
    stepWidth = 60,
    steps = [];

  while (start.getTime() < end.getTime()) {
    const f = format(start, "HH:mm");
    steps.push(format(start, "HH:mm"));
    start = addMinutes(start, stepMinute);
  }

  return {
    stepWidth,
    steps,
    columnWidth: steps.length * stepWidth,
  };
};

export const TimeLine = ({ onScroll, innerRef }: TimeLineProps) => {
  const { resourceRows } = useFakeResourceRecord();
  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();
  const { setInnerRef } = useTimeLineContext();

  const getRowHeight = (index: number) => {
    // шапка 60 :: todo GridContext
    // todo
    return index == 0 ? 60 : resourceRows[index].height;
  };
  const getColumnWidth = () => columnWidth;

  return (
    <AutoSizer style={{ width: "100%", height: "100%" }}>
      {({ height, width }) => (
        <Grid<IFakeResourceRecord[]>
          ref={innerRef}
          innerRef={setInnerRef}
          style={{ width: "100%", height: "100%" }}
          height={height}
          width={width}
          rowCount={resourceRows.length + 1} // todo
          rowHeight={getRowHeight}
          columnCount={shifts.length}
          columnWidth={getColumnWidth}
          itemData={[...resourceRows]}
          innerElementType={innerElementType}
          onScroll={onScroll}
        >
          {ChartRow}
        </Grid>
      )}
    </AutoSizer>
  );
};

const innerElementType = forwardRef<HTMLDivElement, any>(function TimeLineInner(
  { style, ...props },
  ref
) {
  return (
    <article ref={ref} style={{ ...style, position: "relative" }}>
      {/* <TimeCollBackground /> */}
      {props.children}
      <TimeStep />
    </article>
  );
});

const TimeCollBackground = () => {
  const { stepWidth } = useStep30Minute();

  return (
    <div className={timeStepStyle.wrapper}>
      <div
        className={timeStepStyle.background}
        style={{ backgroundSize: `${stepWidth}px 100%` }}
      />
    </div>
  );
};

// todo это не шапка, а композиция из тайм степов и по ним фона
const TimeStep = () => {
  const shifts = useDatesShift();
  const { stepWidth, steps, columnWidth } = useStep30Minute();

  return (
    <header
      className={timeStepStyle.wrapper}
      style={{ backgroundSize: `${stepWidth}px 100%` }}
    >
      <div className={timeStepStyle.stickyContent}>
        {shifts.map((day) => (
          <div
            className={timeStepStyle.day}
            key={day.getTime()}
            style={{ width: `${columnWidth}px` }}
          >
            <span className={timeStepStyle.date} style={{ color: "#6b707c" }}>
              {format(day, "dd-MM-yyyy")}
            </span>
            <div className={timeStepStyle.steps}>
              {steps.map((date, index) => (
                <div
                  key={`${index}::${date}`}
                  className={timeStepStyle.timeStep}
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

const ChartRow = ({
  style,
  data,
  rowIndex,
  columnIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  return rowIndex == 0 ? null : (
    <div className="row" style={{ ...style, backgroundColor: "transparent" }}>
      <span>
        {`resourceData.title: ${data[rowIndex].resourceData.employee} \nitems: ${data[rowIndex].items.length}`}
      </span>
      {"  "}
      <span>
        r{rowIndex} / c{columnIndex}
      </span>
    </div>
  );
};

export default forwardRef<Grid, TimeLineProps>(function TimeLineRef(
  props,
  ref
) {
  return <TimeLine innerRef={ref} {...props} />;
});
