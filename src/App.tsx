import { createRef, useEffect, useRef } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { FakeResourceRecordProvider } from "@store/FakeResourceRecord";
import { useEventListener } from "@hook/useEventListener";
import { Header } from "@component/Header/Header";
import ResourceLineChart from "@component/ResourceChartWindow/ResourceGridChart/ResourceGridChart";
import ResourceGrid from "@component/ResourceChartWindow/ResourceGrid/ResourceGrid";
import { VariableSizeGrid as Grid, GridOnScrollProps } from "react-window";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function App() {
  // todo pzd
  // выносим все части графика в отдельный контекст, для расширения через props.innerElementType
  const resourceGridRef = useRef<Grid>(null);
  const resourceGridChartRef = useRef<Grid>(null);
  // todo туда же
  const workflowRef = useRef<HTMLElement>(null);

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

  const handleResourceScroll = ({
                                  scrollTop,
                                  scrollUpdateWasRequested,
                                }: GridOnScrollProps) => {
    if (scrollUpdateWasRequested === false && resourceGridChartRef.current) {
      resourceGridChartRef.current.scrollTo({ scrollTop });
    }
  };

  const handleResourceChartScroll = ({
                                       scrollTop,
                                       scrollUpdateWasRequested,
                                     }: GridOnScrollProps) => {
    if (scrollUpdateWasRequested === false && resourceGridRef.current) {
      resourceGridRef.current.scrollTo({ scrollTop });
    }
  };

  return (
    <FakeResourceRecordProvider>
      <div className="app">
        <header>
          <Header />
        </header>
        <main className="rms">
          <section
            className="container workflow"
            ref={workflowRef}
            style={{ display: "flex", height: "0" }}
          >
            <Allotment>
              <section className="aside">
                <ResourceGrid
                  onScroll={handleResourceScroll}
                  ref={resourceGridRef}
                />
              </section>
              <section className="timeline">
                <ResourceLineChart
                  onScroll={handleResourceChartScroll}
                  ref={resourceGridChartRef}
                />
              </section>
            </Allotment>
          </section>
          <section className="footer unallocated"></section>
        </main>
      </div>
    </FakeResourceRecordProvider>
  );
}

export default App;
