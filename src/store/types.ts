import { VariableSizeGrid as Grid } from "react-window";

export type ISetRef = (r: Grid) => void
export type IGetRef = () => Grid | null

export type ISetInnerRef = (r: HTMLElement) => void
export type IGetInnerRef = () => HTMLElement | null

export interface ISize {
  height: number,
  width: number
}