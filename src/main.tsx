import { FakeResourceRecordProvider } from "@store/FakeResourceRecord";
import { GUIResourcesProvider } from "@store/GUIResourcesProvider";
import { TimeLineProvider } from "@store/TimeLineProvider";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FakeResourceRecordProvider>
      <TimeLineProvider>
        <GUIResourcesProvider>
          <App />
        </GUIResourcesProvider>
      </TimeLineProvider>
    </FakeResourceRecordProvider>
  </React.StrictMode>
)
