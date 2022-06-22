import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeGrid as Grid, GridProps } from "react-window";
import {
  useFakeResourceRecord,
  IFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { Cell } from "./Cell";
import "./GridBusResources.css";
import { forwardRef } from "react";

const _columnsCount = 2;

type GridBusResourcesProps = Partial<GridProps>;

export const GridBusResources = ({
  onScroll,
  innerRef,
}: GridBusResourcesProps) => {
  const { resourceRows } = useFakeResourceRecord();

  const getRowHeight = (index: number) => resourceRows[index].height;

  const getColumnWidth = (index: number) => (index == 0 ? 110 : 100);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Grid<IFakeResourceRecord[]>
          ref={innerRef}
          onScroll={onScroll}
          width={width}
          height={height}
          rowCount={resourceRows.length}
          rowHeight={getRowHeight}
          columnCount={_columnsCount}
          columnWidth={getColumnWidth}
          itemData={[...resourceRows]}
        >
          {Cell}
        </Grid>
      )}
    </AutoSizer>
  );
};

export default forwardRef<Grid, GridBusResourcesProps>(
  function GridBusResourcesRef(props, ref) {
    return <GridBusResources innerRef={ref} {...props} />;
  }
);
