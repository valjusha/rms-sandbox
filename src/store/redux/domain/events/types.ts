import { ETaskState, ITaskStatus, ITaskTransition } from "@store/redux/domain/tasks/types";
import { RequestStatus } from "@store/types";

export interface IEvents {
  shift: {
    status: RequestStatus
  },
  task: {
    status: RequestStatus
  }
}

export enum ETaskEvent {
  STATUS_CHANGE = "STATUS_CHANGE",
  TIME_CHANGE = 'TIME_CHANGE'
}

export type ITaskEvent = ITaskTimeChangeEvent | ITaskStatusChangeEvent

export interface ITaskTimeChangeEvent {
  type: ETaskEvent.TIME_CHANGE,
  payload: {
    taskId: string,
    dateOffset: string
  }
}

export interface ITaskStatusChangeEvent {
  type: ETaskEvent.STATUS_CHANGE,
  payload: {
    taskId: string,
    state: ETaskState
    status: ITaskStatus,
    transitions: ITaskTransition[]
  }
}

export enum EShiftEvent {
  SHIFT_NEW = "SHIFT_NEW",
  SHIFT_UPDATE = "SHIFT_UPDATE"
}

export type IShiftEvent = INewShiftEvent | IUpdateShiftEvent

export interface IShiftEventPayload {
  resourceId: string,
  shiftId: string,
  name: string,
  scheduledStart: string,
  scheduledEnd: string,
  actualStart: string,
  actualEnd: string
}

export interface INewShiftEvent {
  type: EShiftEvent.SHIFT_NEW,
  payload: IShiftEventPayload
}

export interface IUpdateShiftEvent {
  type: EShiftEvent.SHIFT_UPDATE,
  payload: IShiftEventPayload
}
