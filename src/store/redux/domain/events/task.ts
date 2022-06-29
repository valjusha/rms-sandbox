import { ActionCreatorWithPayload, createAsyncThunk } from "@reduxjs/toolkit";
import { ETaskEvent, ITaskEvent } from "@store/redux/domain/events/types";
import { updateTaskStatus, updateTaskTime } from "@store/redux/domain/tasks/slice";

export const setTaskEvents = createAsyncThunk(
  'taskEvents/setTaskEvents',
  async (payload: ITaskEvent, { dispatch }) => {
    switch (payload.type) {
      case ETaskEvent.STATUS_CHANGE:
        dispatch(updateTaskStatus(payload.payload));
        break;
      case ETaskEvent.TIME_CHANGE:
        dispatch(updateTaskTime(payload.payload));
        break;
      default:
        console.error(`EVENT DATA TYPE: ${(payload as ITaskEvent).type} isn't recognized`);
    }
  }
) as unknown as ActionCreatorWithPayload<ITaskEvent>
