import {combineReducers} from '@reduxjs/toolkit';
import resourcesReducer from './domain/resources/slice';
import shiftsReducer from './domain/shifts/slice';
import tasksReducer from './domain/tasks/slice';

export const rootReducer = combineReducers({
  resources: resourcesReducer,
  shifts: shiftsReducer,
  tasks: tasksReducer
});

export type RootState = ReturnType<typeof rootReducer>
