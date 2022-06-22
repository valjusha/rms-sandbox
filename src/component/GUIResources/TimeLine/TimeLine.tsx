import AutoSizer from "react-virtualized-auto-sizer";
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
  GridProps,
} from "react-window";
import {
  IFakeResourceRecord,
  useFakeResourceRecord,
} from "@store/FakeResourceRecord";
import React, { CSSProperties, forwardRef } from "react";
import { getMinutesInDay } from "@utils/time";
import "./TimeLine.css";

type TimeLineProps = Partial<GridProps>;

export const TimeLine = ({ onScroll, innerRef }: TimeLineProps) => {
  const { resourceRows } = useFakeResourceRecord();
  const getRowHeight = (index: number) => resourceRows[index].height;
  const getColumnWidth = () => {
    // 1min = 7px
    return getMinutesInDay * 7;
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid<IFakeResourceRecord[]>
          ref={innerRef}
          height={height}
          width={width}
          rowCount={resourceRows.length}
          rowHeight={getRowHeight}
          columnCount={3}
          columnWidth={getColumnWidth}
          itemData={[...resourceRows]}
          innerElementType={Element}
          onScroll={onScroll}
        >
          {ChartRow}
        </Grid>
      )}
    </AutoSizer>
  );
};

const Element = forwardRef<
  HTMLDivElement,
  { style: CSSProperties; children: React.ReactNode }
>(function TimeLineInner({ style, ...props }, ref) {
  // const { resourceRows } = useFakeResourceRecord();
  return (
    <div ref={ref} style={style}>
      {props.children}
    </div>
  );
});

const ChartRow = ({
  style,
  data,
  rowIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => (
  <div className="row" style={style}>
    <span>
      {`resourceData.title: ${data[rowIndex].resourceData.employee} \nitems: ${data[rowIndex].items.length}`}
    </span>
  </div>
);

export default forwardRef<Grid, TimeLineProps>(function TimeLineRef(
  props,
  ref
) {
  return <TimeLine innerRef={ref} {...props} />;
});
