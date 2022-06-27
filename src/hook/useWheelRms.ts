import { useEventListener } from "@hook/useEventListener";
import { RefObject } from "react";

export const useWheelRms = (rmsRef: RefObject<HTMLDivElement>) => {
  const handleWheelRms = (event: WheelEvent) => {
    if (event.altKey) {
      event.preventDefault();
      if (event.deltaY > 0) {
        console.log("Down", event.deltaY);
      } else {
        console.log("Up", event.deltaY);
      }
    }
  };

  useEventListener("wheel", handleWheelRms, rmsRef, {
    passive: false,
  });
}