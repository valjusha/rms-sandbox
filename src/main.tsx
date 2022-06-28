import store, { persistor } from "@store/configRedux";
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
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
