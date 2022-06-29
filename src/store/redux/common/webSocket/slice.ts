import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWebSocket } from "@store/redux/common/webSocket/types";
import { EWebSocketStatus } from "@store/types";

const initialState: IWebSocket = {
  status: EWebSocketStatus.CONNECTING
};

export const tasksSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    setWebSocketStatus: (state, action: PayloadAction<EWebSocketStatus>) => {
      state.status = action.payload;
    }
  }
});

export const { setWebSocketStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
