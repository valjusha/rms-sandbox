import store, { persistor } from "@store/configStore";
import { ExpandedRowsProvider } from "@store/context/ExpandedRowsContext";
import { FakeResourceRecordProvider } from "@store/context/FakeResourceRecord";
import { ResourcesAreaProvider } from "@store/context/ResourcesAreaProvider";
import { TimelineProvider } from "@store/context/TimelineProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "react-redux/es/components/Provider";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FakeResourceRecordProvider>
          <TimelineProvider>
            <ResourcesAreaProvider>
              <ExpandedRowsProvider>
                <App />
              </ExpandedRowsProvider>
            </ResourcesAreaProvider>
          </TimelineProvider>
        </FakeResourceRecordProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
