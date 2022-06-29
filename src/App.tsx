import { BusResourcesChart } from "@pages/BusResourcesChart";
import { DateContextProvider } from "@store/context/DatesShift";
import { ExpandedRowsProvider } from "@store/context/ExpandedRowsContext";
import { ResourcesAreaProvider } from "@store/context/ResourcesAreaProvider";
import { TimelineProvider } from "@store/context/TimelineProvider";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import WebSocketProvider from "./wsUtils/WebSocketProvider";

function App() {

  return (
    <WebSocketProvider>
      <TimelineProvider>
        <ResourcesAreaProvider>
          <ExpandedRowsProvider>
            <DndProvider backend={HTML5Backend}>
              <DateContextProvider>
                <BusResourcesChart />
              </DateContextProvider>
            </DndProvider>
          </ExpandedRowsProvider>
        </ResourcesAreaProvider>
      </TimelineProvider>
    </WebSocketProvider>
  );
}

export default App;
