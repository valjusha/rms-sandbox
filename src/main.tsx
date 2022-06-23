import { FakeResourceRecordProvider } from "@store/FakeResourceRecord";
import { ResourcesAreaProvider } from "@store/ResourcesAreaProvider";
import { TimeLineProvider } from "@store/TimeLineProvider";
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FakeResourceRecordProvider>
      <TimeLineProvider>
        <ResourcesAreaProvider>
          <App />
        </ResourcesAreaProvider>
      </TimeLineProvider>
    </FakeResourceRecordProvider>
  </React.StrictMode>
)
