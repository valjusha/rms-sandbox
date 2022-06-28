import { getShifts } from "@store/redux/domain/shifts/slice";
import { getTasks } from "@store/redux/domain/tasks/slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  GridBusResources,
  Timeline,
  UnallocatedTimeLine,
} from "@component/GUIResources";
import { Header } from "@component/Header/Header";
// import { useUnallocatedMinSize } from "@hook/useUnallocatedMinSize";
import { DateContextProvider } from "@store/context/DatesShift";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "antd/dist/antd.css";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()

  // todo: сравнить конфиг с проектом ООП и убрать any
  dispatch<any>(getTasks())
  dispatch<any>(getShifts())

  const {
    gridBusMaxSize,
    gridBusWidth,
    saveGridBusWidth,
    unallocatedHeight,
    saveUnallocatedHeight,
    setRmsRef,
    handleTimelineGridScroll,
  } = useGUIResourcesContext();
  // const { unallocatedMinSize } = useUnallocatedMinSize();

  return (
    <DndProvider backend={HTML5Backend}>
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
                    <Timeline onGridScroll={handleTimelineGridScroll} />
                  </Allotment.Pane>
                </Allotment>
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
    </DndProvider>
  );
}

export default App;
