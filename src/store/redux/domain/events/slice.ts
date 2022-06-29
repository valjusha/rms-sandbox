import { AsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setShiftEvents } from "@store/redux/domain/events/shift";
import { setTaskEvents } from "@store/redux/domain/events/task";
import { IEvents } from "@store/redux/domain/events/types";
import { RequestStatus } from "@store/types";

const initialState: IEvents = {
  shift: {
    status: RequestStatus.IDLE
  },
  task: {
    status: RequestStatus.IDLE
  }
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setTaskEventsRequestStatus: (state, action: PayloadAction<RequestStatus>) => {
      state.task.status = action.payload;
    },
    setShiftEventsRequestStatus: (state, action: PayloadAction<RequestStatus>) => {
      state.shift.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase((setTaskEvents as unknown as AsyncThunk<any, any, any>).fulfilled, (state, action) => {})
      .addCase((setShiftEvents as unknown as AsyncThunk<any, any, any>).fulfilled, (state, action) => {})
  }
});

export const {
  setTaskEventsRequestStatus,
  setShiftEventsRequestStatus
} = eventsSlice.actions;

export default eventsSlice.reducer;
