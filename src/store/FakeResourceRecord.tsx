import { getRandomWorkShift } from "@utils/time";
import { endOfDay, startOfDay } from "date-fns";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const _randomNumber = () => Math.floor(Math.random() * (999 - 111 + 1)) + 111;

export interface FakeDataGenConfiguration {
  rows: number;
  items_per_row: number;
  span: number;
}

const initialFakeDataToGenerate: FakeDataGenConfiguration = {
  rows: 100,
  items_per_row: 30,
  span: 60,
};

export type IFakeResourceRecord = {
  resourceData: IResourceData;
  items: ITask[];
  // todo для каждой записи будем рассчитывать высоту, если задачки имеют пересекающееся время
  height: number;
};

type IResourceData = {
  uuid: string;
  employee: string;
  personnelNumber: string;
  workShifts: ITimeInterval;
};

type ITask = {
  uuid: string;
  date: ITimeInterval;
};

export type ITimeInterval = [Date, Date];

export interface IFakeResourceRecordContext {
  // range: [Date, Date, Date, Date, Date, Date, Date];
  resourceRows: IFakeResourceRecord[];
  readonly formData: FakeDataGenConfiguration;
  updateFormData: (data: Partial<FakeDataGenConfiguration>) => void;
}

const FakeResourceRecordContext =
  createContext<IFakeResourceRecordContext | null>(null);

// hello react 18
// https://solverfox.dev/writing/no-implicit-children/
export const FakeResourceRecordProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [formData, setFormData] = useState<FakeDataGenConfiguration>(
    initialFakeDataToGenerate
  );
  const [rows, upRows] = useState<IFakeResourceRecord[]>([]);

  useEffect(() => {
    upRows(
      Array.from({ length: formData.rows }, (_, index) => ({
        resourceData: {
          uuid: `${index}`,
          employee: `Сотрудник ${index}`,
          workShifts: getRandomWorkShift(),
          personnelNumber: `${_randomNumber()}-${_randomNumber()}`,
        },
        items: [],
        height: 40,
      }))
    );
  }, [formData]);

  const updateFormData = useCallback(
    (props: Partial<FakeDataGenConfiguration>) =>
      setFormData((prev) => ({ ...prev, ...props })),
    [formData]
  );

  return (
    <FakeResourceRecordContext.Provider
      value={{ resourceRows: rows, formData, updateFormData }}
      children={children}
    />
  );
};

export const useFakeResourceRecord = () => {
  const context = useContext(
    FakeResourceRecordContext
  ) as IFakeResourceRecordContext;

  if (context == undefined) {
    throw new Error(
      "useFakeResourceRecord must be used within a FakeResourceRecordProvider"
    );
  }

  return context;
};
