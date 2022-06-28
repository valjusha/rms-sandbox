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
} from "@store/ExpandedRowsContext";
import { useFakeResourceRecord } from "@store/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { TimelineTasks } from "../TimeLine/TimelineTasks";
import { UnallocatedAside } from "./UnallocatedAside";
import "../TimeLine/Timeline.css";

type UnallocatedTimeLineProps = Partial<GridProps>;
export const UnallocatedTimeLine = ({ innerRef }: UnallocatedTimeLineProps) => {
  const { setUnallocatedGridRef, handleUnallocatedGridScroll } =
    useGUIResourcesContext();
  const { unfoldingRows } = useExpandedRowsContext();
  const getRowHeight = () => unfoldingRows?.[_baseExpandedRow]?.height || 30;

  return (
    <section className="unallocated">
      <UnallocatedAside />
      <div className="unallocated-grid">
        <AutoSizer style={{ height: "100%" }}>
          {({ height, width }) => (
            <Grid
              ref={setUnallocatedGridRef}
              innerRef={innerRef}
              style={{ height: "100%" }}
              height={height}
              width={width}
              rowCount={1}
              rowHeight={getRowHeight}
              columnCount={3}
              columnWidth={() => getMinutesInDay * 7}
              itemData={[1]}
              onScroll={handleUnallocatedGridScroll}
            >
              {ChartRow}
            </Grid>
          )}
        </AutoSizer>
      </div>
    </section>
  );
};

const ChartRow = ({ columnIndex, style }: GridChildComponentProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const { tasks } = useFakeResourceRecord();

  const unallocatedTasks = tasks.get("unallocated") || [];

  if (columnIndex > 0) return null;

  return (
    <div className="row" style={style}>
      {unallocatedTasks.length && (
        <TimelineTasks
          tasks={unallocatedTasks}
          offsets={unfoldingRows["unallocated"]?.taskOffsets}
        />
      )}
    </div>
  );
};

export default forwardRef<Grid, UnallocatedTimeLineProps>(
  function UnallocatedTimeLineRef(props, ref) {
    return <UnallocatedTimeLine innerRef={ref} {...props} />;
  }
);
