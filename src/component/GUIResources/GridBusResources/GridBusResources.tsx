import { useGUIResourcesContext } from "@store/GUIResourcesProvider";
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
  const { setGridBusInnerRef } = useGUIResourcesContext()
  const getRowHeight = (index: number) => resourceRows[index].height;

  const getColumnWidth = (index: number) => (index == 0 ? 110 : 100);

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
