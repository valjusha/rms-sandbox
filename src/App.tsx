import { GridBusResources, Timeline, UnallocatedTimeLine } from "@component/GUIResources";
import { Header } from "@component/Header/Header";
import { useEventListener } from "@hook/useEventListener";
import { useUnallocatedMinSize } from "@hook/useUnallocatedMinSize";
import { DateContextProvider } from "@store/DatesShift";
import { useGUIResourcesContext } from "@store/ResourcesAreaProvider";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import { useRef } from "react";
import "./App.css";

function App() {
  const rmsRef = useRef<HTMLDivElement>(null);

  // todo туда же
  const workflowRef = useRef<HTMLElement>(null);
  const {
    gridBusMaxSize,
    gridBusWidth,
    saveGridBusWidth,
    unallocatedHeight,
    saveUnallocatedHeight,
  } = useGUIResourcesContext();
  const { unallocatedMinSize } = useUnallocatedMinSize(rmsRef);

  const handleWheelWorkflowContainer = (event: WheelEvent) => {
    if (event.altKey) {
      event.preventDefault();
      if (event.deltaY > 0) {
        console.log("Down", event.deltaY);
      } else {
        console.log("Up", event.deltaY);
      }
    }
  };

  useEventListener("wheel", handleWheelWorkflowContainer, workflowRef, {
    passive: false,
  });

  return (
    <DateContextProvider>
      <div className="app">
        <header className="app-header">
          <Header />
        </header>
        <div className="rms" ref={rmsRef}>
          <Allotment vertical onChange={saveUnallocatedHeight}>
            <Allotment.Pane>
              <section className="container" ref={workflowRef}>
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
              </section>
            </Allotment.Pane>
            <Allotment.Pane
              // todo: Вернуть после того как будет готов TimelineHeader
              // minSize={unallocatedMinSize}
              minSize={0}
              preferredSize={unallocatedHeight?.toString()}
            >
              <UnallocatedTimeLine />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </DateContextProvider>
  );
}

export default App;
