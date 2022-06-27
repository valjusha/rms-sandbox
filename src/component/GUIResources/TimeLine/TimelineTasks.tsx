import { ITask } from "@utils/fakeData";
import { Task, TaskProps } from "../Task";

type T = Omit<TaskProps, "offsets">;

export interface TimelineTasksProps extends Pick<TaskProps, "offsets"> {
  tasks: ITask[];
}

export const TimelineTasks = ({ tasks, offsets }: TimelineTasksProps) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} type="DEFAULT" offsets={offsets} />
      ))}
    </>
  );
};
