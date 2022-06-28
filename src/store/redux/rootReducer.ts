import {combineReducers} from '@reduxjs/toolkit';
import shiftsReducer from './domain/shifts/slice';
import tasksReducer from './domain/tasks/slice';

export const rootReducer = combineReducers({
  shifts: shiftsReducer,
  tasks: tasksReducer
});

export type RootState = ReturnType<typeof rootReducer>
