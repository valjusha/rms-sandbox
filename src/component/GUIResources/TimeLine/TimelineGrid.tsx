import timeStepStyle from "@component/GUIResources/TimeLine/TimelineHeader.module.css";
import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/DatesShift";
import { useExpandedRowsContext } from "@store/ExpandedRowsContext";
import {
  IFakeResourceRecord,
  useFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { useTimelineContext } from "@store/TimelineProvider";
import { get } from "lodash";
import React, { forwardRef } from "react";
import {
  GridChildComponentProps,
  GridProps,
  VariableSizeGrid as Grid,
} from "react-window";
import { Task } from "../Task";
import { TimelineRow } from "../TimelineRow";

type TimeLineGridProps = Partial<GridProps> & {
  height: number;
  width: number;
};

const TimelineGrid: React.FC<TimeLineGridProps> = ({
  height,
  width,
  onScroll,
}) => {
  const { setGridRef } = useTimelineContext();
  const { unfoldingRows } = useExpandedRowsContext();
  const { resourceRows } = useFakeResourceRecord();

  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();

  const getRowHeight = (index: number) =>
    get(unfoldingRows[resourceRows[index].shift.id], "height", 30);

  const getColumnWidth = () => columnWidth;

  return (
    <Grid<IFakeResourceRecord[]>
      ref={setGridRef}
      style={{ width: "100%", height: "100%" }}
      height={height}
      width={width}
      rowCount={resourceRows.length} // todo
      rowHeight={getRowHeight}
      columnCount={shifts.length}
      columnWidth={getColumnWidth}
      itemData={resourceRows}
      innerElementType={innerElementType}
      onScroll={onScroll}
    >
      {ChartRow}
    </Grid>
  );
};

const innerElementType = forwardRef<HTMLDivElement, any>(function TimeLineInner(
  { style, ...props },
  ref
) {
  return (
    <div ref={ref} style={{ ...style, position: "relative" }}>
      {/* <TimeCollBackground /> */}
      {props.children}
    </div>
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

const ChartRow = ({
  style,
  data,
  rowIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  const { tasks } = useFakeResourceRecord();
  const rowTasks = tasks.filter(
    (task) => task.shiftId === data[rowIndex].shift.id
  );

  return (
    <div className="row" style={{ ...style, backgroundColor: "transparent" }}>
      <TimelineRow accept="DEFAULT" onDrop={(item) => console.log(item)} />
      {rowTasks.map((task) => (
        <Task key={task.id} task={task} type="DEFAULT" />
      ))}
    </div>
  );
};

export default TimelineGrid;
