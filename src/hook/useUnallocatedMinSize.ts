import { useTimeLineContext } from "@store/TimeLineProvider";
import { RefObject, useEffect, useState } from "react";

export const useUnallocatedMinSize = (rmsRef: RefObject<HTMLDivElement>) => {
  const { maxSize: timeLineSize } = useTimeLineContext()
  const [unallocatedMinSize, setUnallocatedMinSize] = useState(0)

  useEffect(() => {
    if (timeLineSize && rmsRef.current && rmsRef.current?.offsetHeight - timeLineSize?.height > 0) {
      setUnallocatedMinSize(rmsRef.current?.offsetHeight - timeLineSize?.height)
    } else {
      setUnallocatedMinSize(0)
    }
  }, [timeLineSize])

  return {
    unallocatedMinSize
  }
}