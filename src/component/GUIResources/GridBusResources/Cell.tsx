import { useExpandedRowsContext } from "@store/ExpandedRowsContext";
import { IFakeResourceRecord, ITimeInterval } from "@store/FakeResourceRecord";
import { IShift } from "@utils/fakeData";
import { format } from "date-fns";
import { useCallback } from "react";
import { GridChildComponentProps } from "react-window";
import styles from "./GridBusResources.module.css";

const shiftFormat = ([from, to]: ITimeInterval) =>
  `${format(from, "HH:mm")} : ${format(to, "HH:mm")}`;

export const Cell = ({
  style,
  data,
  rowIndex,
  columnIndex,
}: GridChildComponentProps<IFakeResourceRecord[]>) => {
  const { handleToggleExpandedRow } = useExpandedRowsContext();
  const { shift } = data[rowIndex];

  const handleDbClick = useCallback(() => handleToggleExpandedRow(rowIndex, shift.id), []);

  const getTemplate = () => {
    switch (columnIndex) {
      case 0:
        return <EmployeeCell {...shift} />;
      case 1:
        return <WorkingHoursCell {...shift} />;
      case 2:
        return <PDACell {...shift} />;
      default:
        return null;
    }
  };

  return (
    <div className="row" style={{ ...style }} onDoubleClick={handleDbClick}>
      {getTemplate()}
    </div>
  );
};

type ResourceCellProps = IShift;

const EmployeeCell = ({ name }: ResourceCellProps) => <div className={styles.cellText}>{name}</div>;

const WorkingHoursCell = ({ resource }: ResourceCellProps) => (
  <div className={styles.cellText}>
    {resource.firstName} {resource.lastName}
  </div>
);

const PDACell = ({ resource }: ResourceCellProps) => <div className={styles.cellText}>{resource.pda}</div>;
