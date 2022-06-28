import { useExpandedRowsContext } from "@store/ExpandedRowsContext";
import {
  IFakeResourceRecord, useFakeResourceRecord
} from "@store/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { useTimelineContext } from "@store/TimelineProvider";
import { get } from "lodash";
import AutoSizer from "react-virtualized-auto-sizer";
import { GridProps, VariableSizeGrid as Grid } from "react-window";
import { Cell } from "./Cell";
import "./GridBusResources.css";

const _columnsCount = 3;

type GridBusResourcesProps = Partial<GridProps>;

export const GridBusResources = ({
  onScroll,
}: GridBusResourcesProps) => {
  const { unfoldingRows } = useExpandedRowsContext();
  const { resourceRows } = useFakeResourceRecord();

  const getRowHeight = (index: number) =>
    get(unfoldingRows[resourceRows[index].shift.id], "height", 30);

  const getColumnWidth = (index: number) =>
    index == 0 ? 135 : index == 1 ? 110 : 135;

  const { setGridBusRef, setGridBusInnerRef, handleGridBusScroll } =
    useGUIResourcesContext();

  const { getHeaderRef } = useTimelineContext();

  return (
    <section className="aside">
      <div
        style={{
          height: getHeaderRef() ? `${getHeaderRef()!.clientHeight}px` : "0",
          backgroundColor: "green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        GridBus Header
      </div>
      <AutoSizer style={{ width: "100%" }}>
        {({ height, width }) => (
          <Grid<IFakeResourceRecord[]>
            ref={setGridBusRef}
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
    </section>
  );
};
