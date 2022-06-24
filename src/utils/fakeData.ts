import { faker } from "@faker-js/faker/locale/ru";
import {
  getDayDateRange,
  getFakeRangeInDay,
  getWorkingDateRange,
} from "./time";

export interface IShift {
  id: string;
  name: string;
  /**
   * schedule
   * - будущее [scheduledStart, scheduledEnd] на все дни которые показываем
   */
  schedule: ISchedule[];
  scheduledStart: Date;
  scheduledEnd: Date;
  actualStart?: null;
  actualEnd?: null;
  resource: IResource;
}

type ISchedule = [Date, Date];

export interface IResource {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  pda?: string;
  skills?: string[];
}

export interface ITask {
  id: string;
  taskType: "ВС";
  shiftId: string | null;
  flightId?: null;
  planStartDate: Date;
  planEndDate: Date;
  estimatedStartDate?: Date; // todo
  estimatedEndDate?: Date; // todo
  factStartDate?: Date; // todo
  factEndDate?: Date; // todo
  uiStartDate?: Date; // todo
  uiEndDate?: Date; // todo
  state: "ASSIGNED"; // enum!
  status: ITaskStatus;
  transitions?: [];
  /*
    skills: [
      'skill1',
      'skill2',
      'skill3',
      'skill4',
      'skill5',
      'skill6',
      'skill7'
    ],
    subtasks: [
      {
        code: 'PREPARATION',
        title: '',
        relativeTime: -1200,
        durationTime: 1200,
        startDate: '2022-06-21T10:51:00.000Z',
        endDate: '2022-06-21T11:11:00.000Z'
      },
      {
        code: 'MAIN',
        startDate: '2022-06-21T11:11:00.000Z',
        endDate: '2022-06-21T17:50:00.000Z',
        title: 'Назначена'
      }
    ],
    options: null,
    remark: null
  */
}

interface ITaskStatus {
  id: null;
  name: "FINISHED"; // todo enum!
  description?: string;
}

export const sleep = (ms: number = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getFakeSchedule = () => {
  const dates = getWorkingDateRange();

  return dates.map((day) => getFakeRangeInDay(day));
};

const fakeShift = (_: unknown, index: number): IShift => {
  const [daysAgo, dayAgo, today, ...nextDays] = getFakeSchedule();
  const [scheduledStart, scheduledEnd] = today;

  return {
    id: faker.datatype.uuid(),
    name: `Тестовая смена ${index}`,
    schedule: [daysAgo, dayAgo, today, ...nextDays],
    scheduledStart,
    scheduledEnd,
    resource: fakeResource(),
  };
};

const fakeResource = (): IResource => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  patronymic: faker.name.middleName(),
  pda: faker.phone.number("+7 (###) ## ## ###"),
  skills: fakeSkills(),
});

const fakeSkills = (): string[] =>
  Array.from({ length: 4 }, () => faker.music.genre());

const fakeTask = (shiftId: string | null = null): ITask => {
  const dates = faker.date.betweens(...getDayDateRange());

  const [planStartDate, planEndDate] = dates;

  return {
    id: faker.datatype.uuid(),
    taskType: "ВС",
    shiftId,
    planStartDate,
    planEndDate,
    state: "ASSIGNED",
    status: {
      id: null,
      name: "FINISHED",
    },
  };
};

export const getFakeShifts = (count: number) =>
  Array.from<unknown, IShift>({ length: count }, fakeShift);

export const getFakeTask = (count: number, shiftsId: ITask["shiftId"] = null) =>
  Array.from({ length: count }, () => fakeTask(shiftsId));

// BACKEND
// Данные по сменам (ресурсам)
const backShifts = {
  shifts: {
    data: [
      {
        id: "f2081bd1-78c5-4b62-82ae-5387f91ba417",
        name: "Тестовая смена 1",
        scheduledStart: "2022-03-25T08:00:00",
        scheduledEnd: "2022-03-25T20:30:00",
        actualStart: null,
        actualEnd: null,
        resource: {
          id: "7aa4a889-1b22-4e21-974b-49cc78042d9b",
          firstName: "Константин",
          lastName: "Тарасов",
          patronymic: "Сергеевич",
          pda: "+79260934534",
          skills: [
            "skill1",
            "skill2",
            "skill3",
            "skill4",
            "skill5",
            "skill6",
            "skill7",
            "skill8",
            "skill9",
          ],
        },
      },
      {
        id: "50bf53eb-a086-4fcc-9835-a3b1a03f92ac",
        name: "Тестовая смена 2",
        scheduledStart: "2022-03-25T07:56:00",
        scheduledEnd: "2022-03-25T20:30:00",
        actualStart: null,
        actualEnd: null,
        resource: {
          id: "b1abc919-84a8-4ccb-9de0-a328b4b65ae5",
          firstName: "Михаил",
          lastName: "Иванов",
          patronymic: "Иванович",
          pda: "",
          skills: [
            "skill1",
            "skill2",
            "skill3",
            "skill4",
            "skill5",
            "skill6",
            "skill7",
            "skill8",
          ],
        },
      },
    ],
  },
};

// BACKEND
// Данные по задачам
// Если shiftId === null значит задача не запланирована
const backTasks = {
  tasks: {
    data: [
      {
        id: "0b24f415-ece0-4e5b-bc4c-bdb02d4c5ab1",
        taskType: "ВС",
        shiftId: "04927f9c-174d-4b2f-9745-1e9b7423f792",
        flightId: null,
        planStartDate: "2022-06-21T13:00:00",
        planEndDate: "2022-06-21T14:00:00",
        estimatedStartDate: "2022-06-21T07:15:00",
        estimatedEndDate: "2022-06-21T08:15:00",
        factStartDate: "2022-06-21T13:00:00",
        factEndDate: "2022-06-21T13:46:20",
        uiStartDate: "2022-06-21T09:50:00.000Z",
        uiEndDate: "2022-06-21T13:46:20",
        state: "ASSIGNED",
        status: {
          id: null,
          name: "FINISHED",
          description: "Закончена",
        },
        transitions: [],
        skills: [
          "skill1",
          "skill2",
          "skill3",
          "skill4",
          "skill5",
          "skill6",
          "skill7",
        ],
        subtasks: [
          {
            code: "PREPARATION",
            title: "",
            relativeTime: -600,
            durationTime: 600,
            startDate: "2022-06-21T09:50:00.000Z",
            endDate: "2022-06-21T10:00:00.000Z",
          },
          {
            code: "MAIN",
            startDate: "2022-06-21T10:00:00.000Z",
            endDate: "2022-06-21T10:46:20.000Z",
            title: "Закончена",
          },
        ],
        options: null,
        remark: null,
      },
      {
        id: "1295ee7e-7f17-4de1-b348-099dc83e761f",
        taskType: "ВС",
        shiftId: "null",
        flightId: null,
        planStartDate: "2022-06-21T15:00:00",
        planEndDate: "2022-06-21T16:00:00",
        estimatedStartDate: "2022-06-21T14:11:00",
        estimatedEndDate: "2022-06-21T20:50:00",
        factStartDate: "2022-06-21T14:58:00",
        factEndDate: null,
        uiStartDate: "2022-06-21T10:51:00.000Z",
        uiEndDate: "2022-06-21T20:50:00",
        state: "ASSIGNED",
        status: {
          id: null,
          name: "ASSIGNED",
          description: "Назначена",
        },
        transitions: [],
        skills: [
          "skill1",
          "skill2",
          "skill3",
          "skill4",
          "skill5",
          "skill6",
          "skill7",
        ],
        subtasks: [
          {
            code: "PREPARATION",
            title: "",
            relativeTime: -1200,
            durationTime: 1200,
            startDate: "2022-06-21T10:51:00.000Z",
            endDate: "2022-06-21T11:11:00.000Z",
          },
          {
            code: "MAIN",
            startDate: "2022-06-21T11:11:00.000Z",
            endDate: "2022-06-21T17:50:00.000Z",
            title: "Назначена",
          },
        ],
        options: null,
        remark: null,
      },
    ],
  },
};

// Данные для отрисовки ресурсов в sidebar
const groups = [
  {
    endTime: "2022-03-25T20:30:00",
    id: "f2081bd1-78c5-4b62-82ae-5387f91ba417",
    name: "Тестовая смена 1",
    resource: {
      firstName: "Константин",
      id: "7aa4a889-1b22-4e21-974b-49cc78042d9b",
      lastName: "Тарасов",
      patronymic: "Сергеевич",
      pda: "+79260934534",
    },
    skills: ["skill1", "skill2", "skill3", "skill4", "skill5"],
    startTime: "2022-03-25T08:00:00",
  },
];

// Данные для отрисовки бара после конвертации
const items = [
  {
    bgColor: "#00FFFF",
    bgColorCompletion: "#00FFFF",
    bgColorPreparation: "#00FFFF",
    canMove: true,
    canResize: "",
    end: 1655808380000,
    estimatedEndDate: "2022-06-21T08:15:00",
    estimatedStartDate: "2022-06-21T07:15:00",
    factEndDate: "2022-06-21T13:46:20",
    factStartDate: "2022-06-21T13:00:00",
    group: "04927f9c-174d-4b2f-9745-1e9b7423f792",
    id: "0b24f415-ece0-4e5b-bc4c-bdb02d4c5ab1",
    planEndDate: "2022-06-21T14:00:00",
    planStartDate: "2022-06-21T13:00:00",
    skills: ["skill1", "skill2", "skill3"],
    start: 1655805000000,
    status: "FINISHED",
    subtasks: [
      {
        code: "PREPARATION",
        durationTime: 600,
        endDate: "2022-06-21T10:00:00.000Z",
        relativeTime: -600,
        startDate: "2022-06-21T09:50:00.000Z",
        title: "",
      },
      {
        code: "MAIN",
        startDate: "2022-06-21T10:00:00.000Z",
        endDate: "2022-06-21T10:46:20.000Z",
        title: "Закончена",
      },
    ],
  },
];
