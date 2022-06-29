import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from "@services/task.service";
import { ITask } from "@store/redux/domain/tasks/types";
import { IReduxDataState } from "@store/redux/types";

const initialState: IReduxDataState<ITask[]> = {
  data: []
}

const timeTypes = {
  PLAN: 'PLAN',
  ESTIMATED: 'ESTIMATED',
  FACT: 'FACT'
}

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => {
    return await fetchTasks()
  }
)

export const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updateTaskStatus(state, action) {
      const { status, taskId, transitions } = action.payload
      const task = state.data.find((t) => t.id === taskId)
      if (task) {
        task.status = status
        task.transitions = transitions
      }
    },
    updateTaskTime(state, action) {
      const { taskId, timeType, startTime, endTime } = action.payload
      const task = state.data.find((t) => t.id === taskId)
      if (task) {
        switch (timeType) {
          case timeTypes.PLAN:
            task.planStartDate = startTime
            task.planEndDate = endTime
            break
          case timeTypes.ESTIMATED:
            task.estimatedStartDate = startTime
            task.estimatedEndDate = endTime
            break
          case timeTypes.FACT:
            task.factStartDate = startTime
            task.factEndDate = endTime
            break
        }
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.data = action.payload.data.map((task: ITask) => {
          if (task.shiftId === null) {
            task.shiftId = "unallocated"
          }
          return task
        })
      })
  }
})

export const {} = tasks.actions

export default tasks.reducer
