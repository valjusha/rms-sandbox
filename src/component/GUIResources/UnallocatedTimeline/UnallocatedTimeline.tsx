import { getMinutesInDay } from "@utils/time";
import { forwardRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  GridChildComponentProps,
  GridProps,
  VariableSizeGrid as Grid,
} from "react-window";

import {
  useExpandedRowsContext,
  _baseExpandedRow,
} from "@store/context/ExpandedRowsContext";
import { useFakeResourceRecord } from "@store/context/FakeResourceRecord";
import "../TimeLine/Timeline.css";
import { TimelineTasks } from "../TimeLine/TimelineTasks";

type UnallocatedTimeLineProps = Partial<GridProps>;
export const UnallocatedTimeLine = ({
  innerRef,
  onScroll,
}: UnallocatedTimeLineProps) => {
  const { unfoldingRows } = useExpandedRowsContext();

  const getRowHeight = () => unfoldingRows[_baseExpandedRow].height;

  return (
    <AutoSizer style={{ height: "100%" }}>
      {({ height, width }) => (
        <Grid
          ref={innerRef}
          style={{ height: "100%" }}
          height={height}
          width={width}
          rowCount={1}
          rowHeight={getRowHeight}
          columnCount={3}
          columnWidth={() => getMinutesInDay * 7}
          itemData={[1]}
          onScroll={onScroll}
        >
          {ChartRow}
        </Grid>
      )}
    </AutoSizer>
  );
};

const ChartRow = ({ style }: GridChildComponentProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const { tasks } = useFakeResourceRecord();
  const unallocatedTasks = tasks.filter(
    (task) => task.shiftId === "unallocated"
  );

  return (
    <div className="row" style={style}>
      <TimelineTasks
        tasks={unallocatedTasks}
        offsets={unfoldingRows["unallocated"].taskOffsets}
      />
    </div>
  );
};

export default forwardRef<Grid, UnallocatedTimeLineProps>(
  function UnallocatedTimeLineRef(props, ref) {
    return <UnallocatedTimeLine innerRef={ref} {...props} />;
  }
);
