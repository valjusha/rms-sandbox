import { getResources } from "@store/redux/domain/resources/slice";
import { getShifts } from "@store/redux/domain/shifts/slice";
import { getTasks } from "@store/redux/domain/tasks/slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useInitData() {
  const dispatch = useDispatch()

  useEffect(() => {
    // todo: сравнить конфиг с проектом ООП и убрать any
    dispatch<any>(getTasks())
    dispatch<any>(getShifts())
    dispatch<any>(getResources())

    return () => {
      console.log('unmounted')
    }
  }, [])
}