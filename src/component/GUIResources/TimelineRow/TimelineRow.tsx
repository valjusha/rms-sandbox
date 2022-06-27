import { TaskType, TaskTypeString } from "@type/RMSBus";
import type { CSSProperties, FC } from "react";
import { memo } from "react";
import { useDrop } from "react-dnd";

const style: CSSProperties = {
  height: "100%",
  width: "100%",
  color: "white",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

export interface TimelineRowProps {
  accept: TaskTypeString;
  lastDroppedItem?: any;
  onDrop: (item: any) => void;
}

export const TimelineRow: FC<TimelineRowProps> = memo(function TimelineRow({
  accept,
  lastDroppedItem,
  onDrop,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "transparent";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive
        ? "Release to drop"
        : `This dustbin accepts: ${TaskType.DEFAULT}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
    </div>
  );
});
