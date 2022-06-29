import { RootState } from "@store/redux/rootReducer";

export const shiftsSelector = (state: RootState) => state.shifts.data
