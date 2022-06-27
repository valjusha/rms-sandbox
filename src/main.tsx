import { ExpandedRowsProvider } from "@store/ExpandedRowsContext";
import { FakeResourceRecordProvider } from "@store/FakeResourceRecord";
import { ResourcesAreaProvider } from "@store/ResourcesAreaProvider";
import { TimelineProvider } from "@store/TimelineProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FakeResourceRecordProvider>
      <TimelineProvider>
        <ResourcesAreaProvider>
          <ExpandedRowsProvider>
            <App />
          </ExpandedRowsProvider>
        </ResourcesAreaProvider>
      </TimelineProvider>
    </FakeResourceRecordProvider>
  </React.StrictMode>
);
