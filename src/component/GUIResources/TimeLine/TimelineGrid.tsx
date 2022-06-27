import { useStep30Minute } from "@hook/useStep30Minute";
import { useDatesShift } from "@store/DatesShift";
import { IFakeResourceRecord, useFakeResourceRecord } from "@store/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { useTimelineContext } from "@store/TimelineProvider";
import React, { forwardRef } from 'react';
import { GridChildComponentProps, GridOnScrollProps, GridProps, VariableSizeGrid as Grid } from "react-window";

type TimeLineGridProps = Partial<GridProps> & {
  height: number,
  width: number
};

const TimelineGrid: React.FC<TimeLineGridProps> = ({ height, width }) => {
  const { setGridRef, handleGridScroll } = useTimelineContext()
  const { resourceRows } = useFakeResourceRecord();
  const shifts = useDatesShift();
  const { columnWidth } = useStep30Minute();
  const { handleTimelineGridScroll } = useGUIResourcesContext();

  const getRowHeight = (index: number) => resourceRows[index].height;

  const getColumnWidth = () => columnWidth;

  const handleScroll = (props: GridOnScrollProps) => {
    handleTimelineGridScroll(props)
    handleGridScroll(props)
  }

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
    <div style={{
      position: "absolute",
      display: "flex",
      width: "100%",
      height: "100%"
    }}>
      {shifts.map((day) => (
        <div
          key={day.getTime()}
          style={{
            display: "flex",
            width: `${columnWidth}px`,
            height: "100%"
          }}
        >
          {steps.map((date, index) => (
            <div
              key={`${index}::${date}`}
              style={{
                width: `${stepWidth}px`,
                height: "100%",
                borderLeft: "1px solid #bbb"
              }}
            />
          ))}
        </div>
      ))}
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