// todo rename BusResource
import { useExpandedRowsContext } from "@store/ExpandedRowsContext";
import {
  useFakeResourceRecord,
  IFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { get } from "lodash";
import { forwardRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { GridProps, VariableSizeGrid as Grid } from "react-window";
import { Cell } from "./Cell";
import "./GridBusResources.css";

const _columnsCount = 3;

type GridBusResourcesProps = Partial<GridProps>;

export const GridBusResources = ({
  onScroll,
  innerRef,
}: GridBusResourcesProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const { resourceRows } = useFakeResourceRecord();
  const { setGridBusInnerRef } = useGUIResourcesContext();

  const getRowHeight = (index: number) =>
    get(unfoldingRows[resourceRows[index].shift.id], "height", 30);

  const getColumnWidth = (index: number) =>
    index == 0 ? 135 : index == 1 ? 110 : 135;

  return (
    <AutoSizer style={{ width: "100%" }}>
      {({ height, width }) => (
        <Grid<IFakeResourceRecord[]>
          ref={innerRef}
          innerRef={setGridBusInnerRef}
          style={{ width: "100%" }}
          onScroll={onScroll}
          width={width}
          height={height}
          rowCount={resourceRows.length}
          rowHeight={getRowHeight}
          columnCount={_columnsCount}
          columnWidth={getColumnWidth}
          estimatedRowHeight={30}
          itemData={resourceRows}
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
