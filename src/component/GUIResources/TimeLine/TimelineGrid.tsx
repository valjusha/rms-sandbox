import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/context/DatesShift";
import { useExpandedRowsContext } from "@store/context/ExpandedRowsContext";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { useTimelineContext } from "@store/context/TimelineProvider";
import { shiftsSelector } from "@store/redux/domain/shifts/selectors";
import { IShift } from "@store/redux/domain/shifts/types";
import { mapTasksSelector, tasksSelector } from "@store/redux/domain/tasks/selectors";
import { get } from "lodash";
import React, { forwardRef, memo } from "react";
import { useSelector } from "react-redux";
import {
  areEqual,
  GridChildComponentProps,
  GridOnScrollProps,
  GridProps,
  VariableSizeGrid as Grid,
} from "react-window";
import { TimelineRow } from "../TimelineRow";
import { TimelineTasks } from "./TimelineTasks";

type TimeLineGridProps = Partial<GridProps> & {
  height: number;
  width: number;
};

const TimelineGrid: React.FC<TimeLineGridProps> = ({ height, width }) => {
  const { setGridRef, handleGridScroll } = useTimelineContext();
  const resourceRows = useSelector(shiftsSelector);
  const { unfoldingRows } = useExpandedRowsContext();

  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();
  const { handleTimelineGridScroll } = useGUIResourcesContext();

  const getRowHeight = (index: number) =>
    get(unfoldingRows[resourceRows[index].id], "height", 30);

  const getColumnWidth = () => columnWidth;

  const handleScroll = (props: GridOnScrollProps) => {
    handleTimelineGridScroll(props);
    handleGridScroll(props);
  };

  return (
    <>
      <Grid<IShift[]>
        ref={setGridRef}
        style={{ width: "100%", height: "100%" }}
        height={height}
        width={width}
        rowCount={resourceRows.length} // todo
        rowHeight={getRowHeight}
        columnCount={1}
        columnWidth={getColumnWidth}
        itemData={[...resourceRows]}
        innerElementType={innerElementType}
        onScroll={handleScroll}
      >
        {ChartRow}
      </Grid>
    </>
  );
};

const innerElementType = forwardRef<HTMLDivElement, any>(function TimeLineInner(
  { style, ...props },
  ref
) {
  return (
    <div ref={ref} style={{ ...style, position: "relative" }}>
      <ChartColumn />
      {props.children}
    </div>
  );
});

const ChartColumn = () => {
  const shifts = useDatesShift();
  const { stepWidth, steps, columnWidth } = useStep30Minute();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      {shifts.map((day) => (
        <div
          key={day.getTime()}
          style={{
            display: "flex",
            width: `${columnWidth}px`,
            height: "100%",
          }}
        >
          {steps.map((date, index) => (
            <div
              key={`${index}::${date}`}
              style={{
                width: `${stepWidth}px`,
                height: "100%",
                borderLeft: "1px solid #bbb",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const ChartRow = memo(
  ({
    style,
    data,
    rowIndex,
    columnIndex,
  }: GridChildComponentProps<IShift[]>) => {
    const shiftId = data[rowIndex].id;
    // const { tasks } = useFakeResourceRecord();
    const tasks = useSelector(mapTasksSelector);
    const { unfoldingRows } = useExpandedRowsContext();
    const rowTasks = tasks.get(shiftId) || [];

    return (
      <div className="row" style={{ ...style, backgroundColor: "transparent" }}>
        <TimelineRow accept="DEFAULT" onDrop={(item) => console.log(item)} />

        {!columnIndex && !!rowTasks.length && (
          <TimelineTasks
            tasks={rowTasks}
            offsets={unfoldingRows?.[shiftId]?.taskOffsets}
          />
        )}
      </div>
    );
  },
  areEqual
);

export default TimelineGrid;
