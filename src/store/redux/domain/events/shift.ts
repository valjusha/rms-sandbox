import { ActionCreatorWithPayload, createAsyncThunk } from "@reduxjs/toolkit";
import { EShiftEvent, IShiftEvent } from "@store/redux/domain/events/types";
import { updateShift, updateShiftAndFetchResource } from "@store/redux/domain/shifts/slice";

export const setShiftEvents = createAsyncThunk(
  'shiftEvents/setShiftEvents',
  async (payload: IShiftEvent, { dispatch }) => {
    switch (payload.type) {
      case EShiftEvent.SHIFT_NEW:
        dispatch(updateShiftAndFetchResource(payload.payload));
        break;
      case EShiftEvent.SHIFT_UPDATE:
        dispatch(updateShift(payload.payload));
        break;
      default:
        console.error(`EVENT DATA TYPE: ${(payload as IShiftEvent).type} isn't recognized`);
    }
  }
) as unknown as ActionCreatorWithPayload<IShiftEvent>
