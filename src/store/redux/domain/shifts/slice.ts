import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { IShiftEventPayload } from "@store/redux/domain/events/types";
import { IShift } from "@store/redux/domain/shifts/types";
import { IReduxDataState } from "@store/redux/types";
import { fetchEmployeeById, fetchShifts } from "@services/resource.service";

const initialState: IReduxDataState<IShift[]> = {
  data: []
}

export const getShifts = createAsyncThunk(
  'shifts/getShifts',
  async () => fetchShifts()
)

export const updateShiftAndFetchResource = createAsyncThunk(
  'shifts/updateShiftAndFetchResource',
  async (payload: IShiftEventPayload, {dispatch}) => {
    const resourceId = payload.resourceId
    try {
      const employee = await fetchEmployeeById(resourceId)
      const shift = {
        ...payload,
        resource: {
          id: employee.data.id,
          firstName: employee.data.firstName,
          lastName: employee.data.lastName,
          patronymic: employee.data.patronymic,
          pda: employee.data.pda,
          skills: employee.data.skills
        }
      }
      // todo: исправить типы
      // @ts-ignore
      shift['id'] = shift.shiftId
      // @ts-ignore
      delete shift.resourceId
      dispatch(addNewShift(shift))
    } catch (e) {
      console.error(e)
    }
  }
)

export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    addNewShift(state, action) {
      state.data.push(action.payload)
    },
    updateShift(state, action) {
      let payload = action.payload
      const shift = state.data.find((shift) => shift.id === payload.shiftId)
      if (shift) {
        shift.name = payload.name
        shift.actualEnd = payload.actualEnd
        shift.actualStart = payload.actualStart
        shift.scheduledEnd = payload.scheduledEnd
        shift.scheduledStart = payload.scheduledStart
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getShifts.fulfilled, (state, action) => {
        state.data = action.payload.data
      })
  }
})

export const { addNewShift, updateShift } = shiftsSlice.actions

export default shiftsSlice.reducer
