import {
  GridBusResourcesForwardRef,
  TimeLineForwardRef,
  UnallocatedTimeLineForwardRef,
} from "@component/GUIResources";
import { Header } from "@component/Header/Header";
import { useEventListener } from "@hook/useEventListener";
import { useGUIResourcesContext } from "@store/GUIResourcesProvider";
import { useTimeLineContext } from "@store/TimeLineProvider";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import { useEffect, useRef, useState } from "react";
import { GridOnScrollProps, VariableSizeGrid as Grid } from "react-window";
import "./App.css";

function App() {
  // todo pzd
  // выносим все части графика в отдельный контекст, для расширения через props.innerElementType
  const rmsRef = useRef<HTMLDivElement>(null)
  const resourceGridRef = useRef<Grid>(null);
  const resourceGridChartRef = useRef<Grid>(null);
  const unallocatedResourceRef = useRef<Grid>(null);
  // todo туда же
  const workflowRef = useRef<HTMLElement>(null);
  const { maxSize: timeLineSize } = useTimeLineContext()
  const {
    gridBusMaxSize,
    gridBusWidth, saveGridBusWidth,
    unallocatedHeight, saveUnallocatedHeight
  } = useGUIResourcesContext()
  const [unallocatedMinSize, setUnallocatedMinSize] = useState(0)

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

  useEffect(() => {
    if (timeLineSize && rmsRef.current && rmsRef.current?.offsetHeight - timeLineSize?.height > 0) {
      setUnallocatedMinSize(rmsRef.current?.offsetHeight - timeLineSize?.height)
    } else {
      setUnallocatedMinSize(0)
    }
  }, [timeLineSize])

  return (
    <div className="app">
      <header>
        <Header />
      </header>
      <div className="rms" ref={rmsRef}>
        <Allotment vertical onChange={saveUnallocatedHeight}>
          <Allotment.Pane>
            <section
              className="container workflow"
              ref={workflowRef}
              style={{ display: "flex", height: "100%" }}
            >
              <Allotment onChange={saveGridBusWidth}>
                <Allotment.Pane minSize={0} maxSize={gridBusMaxSize?.width} preferredSize={gridBusWidth.toString()}>
                  <section className="aside">
                    <GridBusResourcesForwardRef
                      onScroll={handleResourceScroll}
                      ref={resourceGridRef}
                    />
                  </section>
                </Allotment.Pane>
                <Allotment.Pane>
                  <section className="timeline">
                    <TimeLineForwardRef
                      onScroll={handleResourceChartScroll}
                      ref={resourceGridChartRef}
                    />
                  </section>
                </Allotment.Pane>
              </Allotment>
            </section>
          </Allotment.Pane>
          <Allotment.Pane minSize={unallocatedMinSize} preferredSize={unallocatedHeight.toString()}>
            <section className="footer unallocated">
              <UnallocatedTimeLineForwardRef
                onScroll={handleUnallocatedResourceScroll}
                ref={unallocatedResourceRef}
              />
            </section>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}

export default App;
