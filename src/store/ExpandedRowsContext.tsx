import { useFakeResourceRecord } from "@store/FakeResourceRecord";
import { useTimelineContext } from "@store/TimelineProvider";
import { IShift, ITask } from "@utils/fakeData";
import { groupBy } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useGUIResourcesContext } from "./ResourcesAreaProvider";

type RowId = IShift["id"];

type TasksGroup = Record<string | "unallocated", ITask[]>;

export type ExpandedRows = {
  taskOffsets: Record<string, number>;
  height: number;
};

export interface IUseExpandedRows {
  unfoldingRows: Readonly<Record<string, ExpandedRows>>;
  handleToggleExpandedRow: (rowIndex: number, value: RowId) => void;
}

export const _baseExpandedRow: RowId = "unallocated";

const _rowHeight = 30;
// todo куча копий по всему проекту =(
const calcRowHeight = (offset: number) => offset * _rowHeight; // {offset count} * {default row height}

// todo нам бы еще фиксировать ид проблемных тасок, что бы подсвечивать
export const ExpandedRowsContext = createContext<IUseExpandedRows | null>(null);

export const ExpandedRowsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expandedRows, toggleExpandedRow] = useState<RowId[]>([
    _baseExpandedRow,
  ]);
  const { getGridBusRef } = useGUIResourcesContext();
  const { getGridRef } = useTimelineContext();
  const { tasks } = useFakeResourceRecord();

  const handleToggleExpandedRow = useCallback(
    (rowIndex: number, id: RowId) => {
      toggleExpandedRow((data) => {
        const index = [...data].indexOf(id);
        if (index > -1) {
          return data.filter((i) => i !== id);
        } else {
          return [...data, id];
        }
      });

      getGridRef()?.resetAfterRowIndex(rowIndex);
      getGridBusRef()?.resetAfterRowIndex(rowIndex);
    },
    [expandedRows]
  );

  const tasksGroup = useMemo<TasksGroup>(
    () =>
      groupBy(
        tasks.filter((item) =>
          expandedRows.some((rowId) => rowId == item.shiftId)
        ),
        "shiftId"
      ),
    [tasks, expandedRows]
  );

  const unfoldingRows = useMemo(() => {
    const rows: Record<string, ExpandedRows> = {};

    Object.entries({ ...tasksGroup }).map(([shiftId, tasks]) => {
      let offsets: Record<string, number> = {};

      // 1.2 сортируем таски каждого ресурса по времени
      const sortedTasks = tasks.sort((a, b) => {
        if (a.planStartDate === b.planStartDate) {
          // todo => type Date to number
          return a.planEndDate.getTime() - b.planEndDate.getTime();
        }
        return a.planStartDate.getTime() - b.planStartDate.getTime();
      });

      let rowOffset = 0;
      // 1.3 сравниваем даты и увеличиваем {rowOffset} если время тасок накладывается
      while (sortedTasks.length > 0) {
        let lastEnd: number | null = null;

        for (let index = 0; index < sortedTasks.length; index++) {
          const item = sortedTasks[index];

          if (lastEnd === null || item.planStartDate.getTime() > lastEnd) {
            offsets[item.id] = rowOffset;
            sortedTasks.splice(index, 1);
            index--;
            lastEnd = item.planEndDate.getTime();
          }
        }
        rowOffset++;
      }

      rows[shiftId] = {
        taskOffsets: offsets,
        height: calcRowHeight(rowOffset),
      };
    });

    return rows;
  }, [tasksGroup, expandedRows]);

  return (
    <ExpandedRowsContext.Provider
      value={{ handleToggleExpandedRow, unfoldingRows }}
      children={children}
    />
  );
};

export const useExpandedRowsContext = () => {
  const context = useContext(ExpandedRowsContext);

  if (context == undefined) {
    throw new Error(
      "useExpandedRowsContext must be used within a ExpandedRowsProvider"
    );
  }

  return context;
};
