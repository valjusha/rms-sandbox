import { useRef } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { FakeResourceRecordProvider } from "@store/FakeResourceRecord";
import { useEventListener } from "@hook/useEventListener";
import { Header } from "@component/Header/Header";
import {
  GridBusResourcesForwardRef,
  TimeLineForwardRef,
  UnallocatedTimeLineForwardRef,
} from "@component/GUIResources";
import { VariableSizeGrid as Grid, GridOnScrollProps } from "react-window";

function App() {
  // todo pzd
  // выносим все части графика в отдельный контекст, для расширения через props.innerElementType
  const resourceGridRef = useRef<Grid>(null);
  const resourceGridChartRef = useRef<Grid>(null);
  const unallocatedResourceRef = useRef<Grid>(null);
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
    scrollLeft,
    scrollUpdateWasRequested,
  }: GridOnScrollProps) => {
    if (scrollUpdateWasRequested === false && resourceGridRef.current) {
      resourceGridRef.current.scrollTo({ scrollTop });
    }
    if (scrollUpdateWasRequested === false && unallocatedResourceRef.current) {
      unallocatedResourceRef.current?.scrollTo({ scrollLeft });
    }
  };

  const handleUnallocatedResourceScroll = ({
    scrollLeft,
    scrollUpdateWasRequested,
  }: GridOnScrollProps) => {
    if (scrollUpdateWasRequested === false && resourceGridChartRef.current) {
      resourceGridChartRef.current.scrollTo({ scrollLeft });
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
            style={{ display: "flex" }}
          >
            <section className="aside">
              <GridBusResourcesForwardRef
                onScroll={handleResourceScroll}
                ref={resourceGridRef}
              />
            </section>
            <section className="timeline">
              <TimeLineForwardRef
                onScroll={handleResourceChartScroll}
                ref={resourceGridChartRef}
              />
            </section>
          </section>
          <section className="footer unallocated">
            <UnallocatedTimeLineForwardRef
              onScroll={handleUnallocatedResourceScroll}
              ref={unallocatedResourceRef}
            />
          </section>
        </main>
      </div>
    </FakeResourceRecordProvider>
  );
}

export default App;
