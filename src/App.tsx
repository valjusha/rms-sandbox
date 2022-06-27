import { GridBusResources, Timeline, UnallocatedTimeline } from "@component/GUIResources";
import { Header } from "@component/Header/Header";
// import { useUnallocatedMinSize } from "@hook/useUnallocatedMinSize";
import { DateContextProvider } from "@store/DatesShift";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const {
    gridBusMaxSize,
    gridBusWidth,
    saveGridBusWidth,
    unallocatedHeight,
    saveUnallocatedHeight,
    setRmsRef
  } = useGUIResourcesContext();
  // const { unallocatedMinSize } = useUnallocatedMinSize();

  return (
    <DateContextProvider>
      <div className="app">
        <header className="app-header">
          <Header />
        </header>
        <div className="rms" ref={setRmsRef}>
          <Allotment vertical onChange={saveUnallocatedHeight}>
            <Allotment.Pane>
              <Allotment onChange={saveGridBusWidth}>
                <Allotment.Pane
                  minSize={0}
                  maxSize={gridBusMaxSize?.width}
                  preferredSize={gridBusWidth?.toString()}
                >
                  <GridBusResources />
                </Allotment.Pane>
                <Allotment.Pane>
                  <Timeline />
                </Allotment.Pane>
              </Allotment>
            </Allotment.Pane>
            <Allotment.Pane
              // todo: Вернуть после того как будет готов TimelineHeader
              // minSize={unallocatedMinSize}
              minSize={0}
              preferredSize={unallocatedHeight?.toString()}
            >
              <UnallocatedTimeline />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </DateContextProvider>
  );
}

export default App;
