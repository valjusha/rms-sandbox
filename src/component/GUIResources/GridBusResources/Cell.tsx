import { IFakeResourceRecord, ITimeInterval } from "@store/FakeResourceRecord";
import { format } from "date-fns";
import { GridChildComponentProps } from "react-window";
import "./GridBusResources.css";

const shiftFormat = ([from, to]: ITimeInterval) =>
  `${format(from, "HH:mm")} : ${format(to, "HH:mm")}`;

export const Cell = ({
  style,
  data,
  rowIndex,
  columnIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  const { shift } = data[rowIndex];
  return (
    <div className="cell" style={{ ...style }}>
      {columnIndex == 0
        ? shift.name
        : shiftFormat([shift.scheduledStart, shift.scheduledEnd])}
    </div>
  );
};
