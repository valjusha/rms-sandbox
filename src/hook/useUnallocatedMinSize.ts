import { IFakeResourceRecord, useFakeResourceRecord } from "@store/FakeResourceRecord";
import { useTimelineContext } from "@store/TimelineProvider";
import { RefObject, useEffect, useState } from "react";

export const useUnallocatedMinSize = (rmsRef: RefObject<HTMLDivElement>) => {
  const { getGridRef } = useTimelineContext()
  const { resourceRows } = useFakeResourceRecord();
  const [unallocatedMinSize, setUnallocatedMinSize] = useState(0)

  useEffect(() => {
    const ref = getGridRef()

    if (ref) {
      const { itemData } = ref.props
      const contentHeight = itemData.reduce((a: number, b: IFakeResourceRecord) => a + b.height, 0)

      if (rmsRef.current && rmsRef.current?.offsetHeight - contentHeight > 0) {
        setUnallocatedMinSize(rmsRef.current?.offsetHeight - contentHeight)
      } else {
        setUnallocatedMinSize(0)
      }
    }
  })

  return {
    unallocatedMinSize
  }
}