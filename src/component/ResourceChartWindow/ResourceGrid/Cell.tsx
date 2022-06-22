import { IFakeResourceRecord, ITimeInterval } from "@store/FakeResourceRecord";
import { format } from "date-fns";
import { GridChildComponentProps } from "react-window";
import "./ResourceGrid.css";

const shiftFormat = ([from, to]: ITimeInterval) =>
  `${format(from, "HH:mm")} : ${format(to, "HH:mm")}`;

export const Cell = ({
  style,
  data,
  rowIndex,
  columnIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  const { resourceData } = data[rowIndex];
  return (
    <div className="cell" style={{ ...style }}>
      {columnIndex == 0
        ? resourceData.employee
        : shiftFormat(resourceData.workShifts)}
    </div>
  );
};
