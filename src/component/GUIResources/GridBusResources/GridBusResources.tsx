import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { useTimelineContext } from "@store/TimelineProvider";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeGrid as Grid } from "react-window";
import {
  useFakeResourceRecord,
  IFakeResourceRecord,
} from "@store/FakeResourceRecord";
import { Cell } from "./Cell";
import "./GridBusResources.css";

const _columnsCount = 2;

export const GridBusResources = () => {
  const { resourceRows } = useFakeResourceRecord();
  const getRowHeight = (index: number) => resourceRows[index].height;
  const getColumnWidth = (index: number) => (index == 0 ? 110 : 100);
  const {
    setGridBusRef,
    setGridBusInnerRef,
    handleGridBusScroll
  } = useGUIResourcesContext();
  const { getHeaderRef } = useTimelineContext()

  return (
    <section className="aside">
      <div style={{
        height: getHeaderRef() ? `${getHeaderRef()!.clientHeight}px` : "0",
        backgroundColor: "green",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        GridBus Header
      </div>
      <AutoSizer style={{ width: "100%" }}>
        {({ height, width }) => (
          <Grid<IFakeResourceRecord[]>
            ref={setGridBusRef}
            innerRef={setGridBusInnerRef}
            style={{ width: "100%" }}
            onScroll={handleGridBusScroll}
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
    </section>
  );
};
