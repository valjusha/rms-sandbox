export interface IShift {
  id: string,
  name: string,
  scheduledStart: string,
  scheduledEnd: string,
  actualStart: string | null,
  actualEnd: string | null
  resource: {
    id: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    pda: string,
    skills: string[]
  }
}