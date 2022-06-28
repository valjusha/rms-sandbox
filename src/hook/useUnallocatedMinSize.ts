import { IFakeResourceRecord, useFakeResourceRecord } from "@store/context/FakeResourceRecord";
import { useGUIResourcesContext } from "@store/context/ResourcesAreaProvider";
import { useTimelineContext } from "@store/context/TimelineProvider";
import { useEffect, useState } from "react";

export const useUnallocatedMinSize = () => {
  const { getGridRef } = useTimelineContext()
  const { resourceRows } = useFakeResourceRecord();
  const [unallocatedMinSize, setUnallocatedMinSize] = useState(0)
  const { getRmsRef } = useGUIResourcesContext()

  useEffect(() => {
    const ref = getGridRef()

    if (ref) {
      const { itemData } = ref.props
      const contentHeight = itemData.reduce((a: number, b: IFakeResourceRecord) => a + b.height, 0)

      if (getRmsRef() && getRmsRef()!.offsetHeight - contentHeight > 0) {
        setUnallocatedMinSize(getRmsRef()!.offsetHeight - contentHeight)
      } else {
        setUnallocatedMinSize(0)
      }
    }
  })

  return {
    unallocatedMinSize
  }
}