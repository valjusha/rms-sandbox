export enum ETaskState {
  CREATED = "CREATED",
  PLANNED = "PLANNED",
  ASSIGNED = "ASSIGNED",
  CONFIRMED = "CONFIRMED",
  STARTED = "STARTED",
  FINISHED = "FINISHED",
  CANCELED = "CANCELED",
}

export interface ITask {
  id: string,
  taskType: string,
  shiftId: string,
  flightId: string,
  planStartDate: string,
  planEndDate: string,
  estimatedStartDate: string,
  estimatedEndDate: string,
  factStartDate: string,
  factEndDate: string,
  uiStartDate: string,
  uiEndDate: string,
  state: ETaskState,
  status: {
    id: string,
    name: string,
    description: string
  },
  transitions: [
    {
      id: string,
      status: {
        id: string,
        name: string,
        description: string
      },
      displayName: string
    }
  ],
  skills: [
    string
  ],
  statuses: [
    {
      title: string,
      relativeTime: string,
      durationTime: string
    }
  ],
  options: {
    additionalProp1: string,
    additionalProp2: string,
    additionalProp3: string
  },
  remark: string,
  manual: true
}