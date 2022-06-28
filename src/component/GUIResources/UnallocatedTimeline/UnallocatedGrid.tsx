import { _baseExpandedRow, useExpandedRowsContext } from "@store/context/ExpandedRowsContext";
import { IFakeResourceRecord, useFakeResourceRecord } from "@store/context/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { getMinutesInDay } from "@utils/time";
import React from 'react';
import { GridChildComponentProps, GridProps, VariableSizeGrid as Grid } from "react-window";

type UnallocatedGridProps = Partial<GridProps> & {
  height: number,
  width: number
};

export const UnallocatedGrid: React.FC<UnallocatedGridProps> = ({
  height,
  width
}) => {
  const { resourceRows: allResourceRows } = useFakeResourceRecord();
  const {
    setUnallocatedGridRef,
    handleUnallocatedGridScroll
  } = useGUIResourcesContext();
  const resourceRows = [...allResourceRows].shift() as IFakeResourceRecord;
  const { unfoldingRows } = useExpandedRowsContext();
  const getRowHeight = () => unfoldingRows[_baseExpandedRow].height;

  return (
    <Grid<IFakeResourceRecord[]>
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

const ChartRow = ({
  style,
  data,
  rowIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => (
  <div className="row" style={style}>
    <span>
      {`resourceData.title: ${data[rowIndex]?.shift.id} \n ${data[rowIndex]?.shift.name}`}
    </span>
  </div>
);

