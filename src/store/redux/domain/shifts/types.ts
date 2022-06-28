export interface IShift {
  id: string,
  name: string,
  scheduledStart: Date,
  scheduledEnd: Date,
  actualStart: Date | null,
  actualEnd: Date | null
  resource: {
    id: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    pda: string,
    skills: string[]
  }
}