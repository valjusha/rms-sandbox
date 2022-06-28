import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { IShift } from "@store/redux/domain/shifts/types";
import { IReduxDataState } from "@store/redux/types";
import { fetchShifts } from "@services/resource.service";

const initialState: IReduxDataState<IShift[]> = {
  data: []
}

export const getShifts = createAsyncThunk(
  'shifts/getShifts',
  async () => fetchShifts()
)

export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    addNewShift(state, action) {
      state.data.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getShifts.fulfilled, (state, action) => {
        state.data = action.payload.data
      })
  }
})

export const {} = shiftsSlice.actions

export default shiftsSlice.reducer
