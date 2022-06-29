import { createAction } from '@reduxjs/toolkit';
import {
  SUBSCRIBE_TO_SHIFT_EVENTS,
  SUBSCRIBE_TO_TASK_EVENTS,
  UNSUBSCRIBE_FROM_SHIFT_EVENTS,
  UNSUBSCRIBE_FROM_TASK_EVENTS
} from "@store/redux/consts";

export const subscribeToShiftEvents = createAction(SUBSCRIBE_TO_SHIFT_EVENTS);
export const unsubscribeFromShiftEvents = createAction(UNSUBSCRIBE_FROM_SHIFT_EVENTS);

export const subscribeToTaskEvents = createAction(SUBSCRIBE_TO_TASK_EVENTS);
export const unsubscribeFromTaskEvents = createAction(UNSUBSCRIBE_FROM_TASK_EVENTS);
