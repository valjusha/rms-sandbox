import { getMinutesInDay } from "@utils/time";
import { forwardRef, memo } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  areEqual,
  GridChildComponentProps,
  GridProps,
  VariableSizeGrid as Grid
} from "react-window";

import { useStep30Minute } from "@hook/useStep30Minute";
import {
  useExpandedRowsContext,
  _baseExpandedRow
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
  const { columnWidth } = useStep30Minute();
  const { unfoldingRows } = useExpandedRowsContext();
  const getRowHeight = () => unfoldingRows?.[_baseExpandedRow]?.height || 30;
  const getColumnWidth = () => columnWidth;

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
              columnWidth={getColumnWidth}
              itemData={['empty']}
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

const ChartRow = memo(({ columnIndex, style }: GridChildComponentProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const { tasks } = useFakeResourceRecord();

  const unallocatedTasks = tasks.get("unallocated") || [];

  if (columnIndex > 0) return null;

  return (
    <div style={style}>
      {unallocatedTasks.length && (
        <TimelineTasks
          tasks={unallocatedTasks}
          offsets={unfoldingRows["unallocated"]?.taskOffsets}
        />
      )}
    </div>
  );
}, areEqual);

export default forwardRef<Grid, UnallocatedTimeLineProps>(
  function UnallocatedTimeLineRef(props, ref) {
    return <UnallocatedTimeLine innerRef={ref} {...props} />;
  }
);
