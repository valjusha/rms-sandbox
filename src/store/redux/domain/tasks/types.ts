export enum ETaskState {
  CREATED = "CREATED",
  PLANNED = "PLANNED",
  ASSIGNED = "ASSIGNED",
  CONFIRMED = "CONFIRMED",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
}

export interface ITaskStatus {
  id: string,
  name: string,
  description: string
}

export interface ITaskTransition {
  id: string,
  status: ITaskStatus,
  displayName: string
}

export interface ITaskStatusesItem {
  title: string,
  relativeTime: string,
  durationTime: string
}

export interface ITask {
  id: string,
  taskType: string,
  shiftId: string,
  flightId: string,
  planStartDate: string,
  planEndDate: string,
  estimatedStartDate: string | null,
  estimatedEndDate: string | null,
  factStartDate: string | null,
  factEndDate: string | null,
  uiStartDate: string,
  uiEndDate: string,
  state: ETaskState,
  status: ITaskStatus,
  transitions: ITaskTransition[],
  skills: string[],
  statuses: ITaskStatusesItem[],
  options: object,
  remark: string,
  manual: boolean
}