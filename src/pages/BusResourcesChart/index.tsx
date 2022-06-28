import { GridBusResources, Timeline, UnallocatedTimeline } from "@component/GUIResources";
import { Header } from "@component/Header/Header";
import { useInitData } from "@hook/useInitData";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { Allotment } from "allotment";
import React from 'react';
import './index.css'

export const BusResourcesChart = () => {
  const {
    saveGridBusWidth,
    saveUnallocatedHeight,
    setRmsRef,
    gridBusMaxSize,
    gridBusWidth,
    unallocatedHeight
  } = useGUIResourcesContext();
  // const { unallocatedMinSize } = useUnallocatedMinSize();
  useInitData()

  return (
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
  );
};
