import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/context/DatesShift";
import { useExpandedRowsContext } from "@store/context/ExpandedRowsContext";
import {
  IFakeResourceRecord,
  useFakeResourceRecord,
} from "@store/context/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { useTimelineContext } from "@store/context/TimelineProvider";
import { get } from "lodash";
import React, { forwardRef, memo } from "react";
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
  const { resourceRows } = useFakeResourceRecord();
  const { unfoldingRows } = useExpandedRowsContext();

  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();
  const { handleTimelineGridScroll } = useGUIResourcesContext();

  const getRowHeight = (index: number) =>
    get(unfoldingRows[resourceRows[index].shift.id], "height", 30);

  const getColumnWidth = () => columnWidth;

  const handleScroll = (props: GridOnScrollProps) => {
    handleTimelineGridScroll(props);
    handleGridScroll(props);
  };

  return (
    <>
      <Grid<IFakeResourceRecord[]>
        ref={setGridRef}
        style={{ width: "100%", height: "100%" }}
        height={height}
        width={width}
        rowCount={resourceRows.length} // todo
        rowHeight={getRowHeight}
        columnCount={shifts.length}
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
  }: GridChildComponentProps<IFakeResourceRecord[]>) => {
    const { id: shiftId } = data[rowIndex].shift;
    const { tasks } = useFakeResourceRecord();
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
