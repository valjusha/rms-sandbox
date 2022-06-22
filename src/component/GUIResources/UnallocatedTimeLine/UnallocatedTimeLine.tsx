import AutoSizer from "react-virtualized-auto-sizer";
import {
  IFakeResourceRecord,
  useFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { forwardRef } from "react";
import {
  VariableSizeGrid as Grid,
  GridChildComponentProps,
  GridProps,
} from "react-window";
import { getMinutesInDay } from "@utils/time";

import "../TimeLine/TimeLine.css";

type UnallocatedTimeLineProps = Partial<GridProps>;

const UnallocatedTimeLine = ({
  innerRef,
  onScroll,
}: UnallocatedTimeLineProps) => {
  const { resourceRows: allResourceRows } = useFakeResourceRecord();
  const resourceRows = [...allResourceRows].shift() as IFakeResourceRecord;
  const getRowHeight = () => resourceRows.height;

  return (
    <AutoSizer style={{ height: "100%" }}>
      {({ height, width }) => (
        <Grid<IFakeResourceRecord[]>
          ref={innerRef}
          style={{ height: "100%" }}
          height={height}
          width={width}
          rowCount={1}
          rowHeight={getRowHeight}
          columnCount={3}
          columnWidth={() => getMinutesInDay * 7}
          itemData={[resourceRows]}
          onScroll={onScroll}
        >
          {ChartRow}
        </Grid>
      )}
    </AutoSizer>
  );
};

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

export default forwardRef<Grid, UnallocatedTimeLineProps>(
  function UnallocatedTimeLineRef(props, ref) {
    return <UnallocatedTimeLine innerRef={ref} {...props} />;
  }
);
