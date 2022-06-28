export interface IResourceShift     {
  id: string,
  name: string,
  scheduledStart: Date,
  scheduledEnd: Date,
  actualStart: Date | null,
  actualEnd: Date | null
}

export interface IResource {
  id: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  pda: string,
  shifts: IResourceShift[],
  skills: string[]
}