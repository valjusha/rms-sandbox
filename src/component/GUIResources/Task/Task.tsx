import { ITask } from "@store/redux/domain/tasks/types";
import { TaskTypeString } from "@type/RMSBus";
import { differenceInMinutes, format, parseISO, startOfDay, subDays } from "date-fns";
import React, { CSSProperties, memo } from "react";
import { useDrag } from "react-dnd";

const startDate = subDays(new Date(), 2);

const alignLeft = (task: ITask, floatFixed = 2) => {
  const start = startOfDay(startDate).getTime();
  const diff = differenceInMinutes(parseISO(task.uiStartDate), start);

  return (diff * 2).toFixed(floatFixed);
};

export function snapToGrid(x: number, y: number): [number, number] {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return [snappedX, snappedY];
}

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  cursor: "move",
  position: "absolute",
  height: "30px",
  top: 0,
};

export interface TaskProps {
  task: ITask;
  // todo не нужно все офсеты забирать, берем только относящейся к таске
  offset?: number;
  type: TaskTypeString;
}
const getWidth = ({ uiEndDate, uiStartDate }: ITask) => {
  const diff = differenceInMinutes(parseISO(uiEndDate), parseISO(uiStartDate));

  return (diff * 2).toFixed(2);
};

const getPosition = (task: ITask, offset: number): CSSProperties => ({
  width: `${getWidth(task)}px`,
  top: `${offset * 30}px`,
  left: `${alignLeft(task)}px`,
});

export const Task: React.FC<TaskProps> = memo(({ task, type, offset = 0 }) => {
  const { id, uiEndDate, uiStartDate } = task;
  const [{ opacity }, drag] = useDrag(() => ({
    type,
    options: {
      dropEffect: "moving",
    },
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));
  const diff = alignLeft(task);
  if (task.shiftId === 'unallocated') {
    console.log(">> ", task.shiftId, id, diff)
  } else {
    console.log(">>>> ", task.shiftId, id, diff)
  }
  return (
    <div
      ref={drag}
      // todo обернуть в мемо расчет стилей!
      style={{
        ...style,
        opacity,
        left: `${diff}px`,
        ...getPosition(task, offset),
      }}
      data-testid="box"
    >
      {format(parseISO(uiStartDate), "dd HH:mm")}
      {" — "}
      {format(parseISO(uiEndDate), "dd HH:mm")}
    </div>
  );
});
