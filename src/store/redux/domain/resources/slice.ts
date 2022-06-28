import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchEmployees } from "@services/resource.service";
import { IResource } from "@store/redux/domain/resources/types";
import { IReduxDataState } from "@store/redux/types";

const initialState: IReduxDataState<IResource[]> = {
  data: []
}

export const getResources = createAsyncThunk(
  'resources/getResources',
  async () => fetchEmployees()
)

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addNewShift(state, action) {
      state.data.push(action.payload)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getResources.fulfilled, (state, action) => {
        state.data = action.payload.data
      })
  }
})

export const {} = resourcesSlice.actions

export default resourcesSlice.reducer
