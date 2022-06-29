import { IShift } from "@store/redux/domain/shifts/types";
import { ITask } from "@store/redux/domain/tasks/types";
import { RootState } from "@store/redux/rootReducer";
import { groupBy } from "lodash";

export const tasksSelector = (state: RootState) => state.tasks.data

export type IMapTasks = Map<IShift["id"], ITask[]>

export const mapTasksSelector = (state: RootState) => {
  return new Map(
    Object.entries(
      groupBy(state.tasks.data, "shiftId")
    )
  )
}
