import { TimelineTasks } from "@component/GUIResources/TimeLine/TimelineTasks";
import { _baseExpandedRow, useExpandedRowsContext } from "@store/context/ExpandedRowsContext";
// import { useFakeResourceRecord } from "@store/context/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { shiftsSelector } from "@store/redux/domain/shifts/selectors";
import { IShift } from "@store/redux/domain/shifts/types";
import { mapTasksSelector, tasksSelector } from "@store/redux/domain/tasks/selectors";
import { getMinutesInDay } from "@utils/time";
import React, { memo } from 'react';
import { useSelector } from "react-redux";
import { areEqual, GridChildComponentProps, GridProps, VariableSizeGrid as Grid } from "react-window";

type UnallocatedGridProps = Partial<GridProps> & {
  height: number,
  width: number
};

export const UnallocatedGrid: React.FC<UnallocatedGridProps> = ({
  height,
  width
}) => {
  const allResourceRows = useSelector(shiftsSelector);
  const {
    setUnallocatedGridRef,
    handleUnallocatedGridScroll
  } = useGUIResourcesContext();
  const resourceRows = [...allResourceRows].shift() as IShift;
  const { unfoldingRows } = useExpandedRowsContext();
  const getRowHeight = () => unfoldingRows[_baseExpandedRow] ? unfoldingRows[_baseExpandedRow].height : 30;

  return (
    <Grid<IShift[]>
      ref={setUnallocatedGridRef}
      style={{ height: "100%" }}
      height={height}
      width={width}
      rowCount={1}
      rowHeight={getRowHeight}
      columnCount={3}
      columnWidth={() => getMinutesInDay * 7}
      itemData={[resourceRows]}
      onScroll={handleUnallocatedGridScroll}
    >
      {ChartRow}
    </Grid>
  );
};

const ChartRow = memo(({ columnIndex, style }: GridChildComponentProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const tasks = useSelector(mapTasksSelector);

  const unallocatedTasks = tasks.get("unallocated") || [];

  if (columnIndex > 0) return null;

  return (
    <div style={style}>
      {/* При условном рендере внутри JSX лучше явно прописывать условие, в противном случае */}
      {/* если unallocatedTasks.length = 0, значение "0" отрендерится в DOM */}
      {unallocatedTasks.length !== 0 && (
        <TimelineTasks
          tasks={unallocatedTasks}
          offsets={unfoldingRows["unallocated"]?.taskOffsets}
        />
      )}
    </div>
  );
}, areEqual);

