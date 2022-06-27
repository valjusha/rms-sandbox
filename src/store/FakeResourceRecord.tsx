import { getFakeShifts, getFakeTask, IShift, ITask } from "@utils/fakeData";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect, useState
} from "react";

export interface FakeDataGenConfiguration {
  rows: number;
  items_per_row: number;
  span: number;
}

const initialFakeDataToGenerate: FakeDataGenConfiguration = {
  rows: 2,
  items_per_row: 4,
  span: 60,
};

export type IFakeResourceRecord = {
  shift: IShift;
};

export type ITimeInterval = [Date, Date];

export interface IFakeResourceRecordContext {
  readonly tasks: ITask[];
  readonly resourceRows: IFakeResourceRecord[];
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

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [rows, setRows] = useState<IFakeResourceRecord[]>([]);

  useEffect(() => {
    const { rows, items_per_row } = formData;
    const shifts = getFakeShifts(formData.rows);

    const shiftTasks = shifts
      // .slice(10, shifts.length > 2 ? Math.floor(rows / 2) : undefined)
      .map((shift) => shift.id)
      .map((id) => getFakeTask(items_per_row, id))
      .flat();

    const upRows = shifts.map((shift) => ({ shift }));
    const upTasks = [...shiftTasks, ...getFakeTask(items_per_row)];

    setRows(upRows);
    setTasks(upTasks);
  }, [formData]);

  const updateFormData = useCallback(
    (props: Partial<FakeDataGenConfiguration>) =>
      setFormData((prev) => ({ ...prev, ...props })),
    [formData]
  );

  return (
    <FakeResourceRecordContext.Provider
      value={{
        resourceRows: rows,
        tasks,
        formData,
        updateFormData,
      }}
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
