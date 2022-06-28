import { BusResourcesChart } from "@pages/BusResourcesChart";
import { DateContextProvider } from "@store/context/DatesShift";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import { ExpandedRowsProvider } from "@store/context/ExpandedRowsContext";
import { FakeResourceRecordProvider } from "@store/context/FakeResourceRecord";
import { ResourcesAreaProvider } from "@store/context/ResourcesAreaProvider";
import { TimelineProvider } from "@store/context/TimelineProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  return (
    <FakeResourceRecordProvider>
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
    </FakeResourceRecordProvider>
  );
}

export default App;
