export interface IShift {
  id: string,
  name: string,
  scheduledStart: string,
  scheduledEnd: string,
  actualStart: string,
  actualEnd: string,
  resource: {
    id: string,
    firstName: string,
    lastName: string,
    patronymic: string,
    pda: string,
    skills: [
      string
    ]
  }
}