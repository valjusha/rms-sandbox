import { VariableSizeGrid as Grid } from "react-window";

export type ISetGridRef = (r: Grid) => void
export type IGetGridRef = () => Grid | null

export type ISetRef = (r: HTMLElement) => void
export type IGetRef = () => HTMLElement | null

export type ISetDivRef = (r: HTMLDivElement) => void
export type IGetDivRef = () => HTMLDivElement | null

export interface ISize {
  height: number | undefined,
  width: number | undefined
}