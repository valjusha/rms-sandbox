export interface IResourceShift     {
  id: string,
  name: string,
  scheduledStart: string,
  scheduledEnd: string,
  actualStart: string | null,
  actualEnd: string | null
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