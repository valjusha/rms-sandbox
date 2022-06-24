import timeStepStyle from "@component/GUIResources/TimeLine/TimelineHeader.module.css";
import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/DatesShift";
import { IFakeResourceRecord, useFakeResourceRecord } from "@store/FakeResourceRecord";
import { useTimelineContext } from "@store/TimelineProvider";
import React, { forwardRef } from 'react';
import { GridChildComponentProps, GridProps, VariableSizeGrid as Grid } from "react-window";

type TimeLineGridProps = Partial<GridProps> & {
  height: number,
  width: number
};

const TimelineGrid: React.FC<TimeLineGridProps> = ({ height, width, onScroll }) => {
  const { setGridRef } = useTimelineContext()
  const { resourceRows } = useFakeResourceRecord();
  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();

  const getRowHeight = (index: number) => resourceRows[index].height;

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
      itemData={[...resourceRows]}
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
  columnIndex
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  return (
    <div className="row" style={{ ...style, backgroundColor: "transparent" }}>
      <span>
        {`resourceData.title: ${data[rowIndex].shift.name}`}
      </span>
      {"  "}
      <span>
        r{rowIndex} / c{columnIndex}
      </span>
    </div>
  );
};

export default TimelineGrid;