import React from "react";
import { GridOnScrollProps, VariableSizeGrid as Grid } from "react-window";

// todo где хранить типы двух сторов?
export type ISetGridRef = (r: Grid) => void
export type IGetGridRef = () => Grid | null

export type ISetRef = (r: HTMLElement) => void
export type IGetRef = () => HTMLElement | null

export type ISetDivRef = (r: HTMLDivElement) => void
export type IGetDivRef = () => HTMLDivElement | null

export type IHandleGridScroll = (props: GridOnScrollProps) => void

export type IHandleRefScroll<T> = (props: React.UIEvent<T, UIEvent>) => void

export interface ISize {
  height: number | undefined,
  width: number | undefined
}

export enum RequestStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  UPDATING = 'UPDATING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED'
}

export enum EWebSocketStatus {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  STOMP_ERROR = 'STOMP_ERROR',
  WS_CLOSED = 'WS_CLOSED',
  WS_ERROR = 'WS_ERROR'
}