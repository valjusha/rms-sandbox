import { getDayDateRange } from "@utils/time";
import { addMinutes, format } from "date-fns";

export const useStep30Minute = (): {
  stepWidth: number;
  steps: string[];
  columnWidth: number;
} => {
  let [start, end] = getDayDateRange();
  const stepMinute = 30,
    stepWidth = 60,
    steps = [];

  while (start.getTime() < end.getTime()) {
    const f = format(start, "HH:mm");
    steps.push(format(start, "HH:mm"));
    start = addMinutes(start, stepMinute);
  }

  return {
    stepWidth,
    steps,
    columnWidth: steps.length * stepWidth,
  };
};