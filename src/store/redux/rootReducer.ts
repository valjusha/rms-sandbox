import {combineReducers} from '@reduxjs/toolkit';
import resourcesReducer from './domain/resources/slice';
import shiftsReducer from './domain/shifts/slice';
import tasksReducer from './domain/tasks/slice';
import webSocketReducer from './common/webSocket/slice';

export const rootReducer = combineReducers({
  resources: resourcesReducer,
  shifts: shiftsReducer,
  tasks: tasksReducer,
  webSocket: webSocketReducer
});

export type RootState = ReturnType<typeof rootReducer>
