import { ITask } from "@utils/fakeData";
import { Task, TaskProps } from "../Task";

export interface TimelineTasksProps {
  tasks: ITask[];
  offsets?: Record<string, number>;
}

export const TimelineTasks = ({ tasks, offsets }: TimelineTasksProps) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          type="DEFAULT"
          offset={offsets && offsets[task.id]}
        />
      ))}
    </>
  );
};
