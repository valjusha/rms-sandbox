export type IReduxDataState<T> = {
  data: T
}

export enum EWebSocketStatus {
  CONNECTED = 'CONNECTED',
  CONNECTING = 'CONNECTING',
  DISCONNECTED = 'DISCONNECTED',
  STOMP_ERROR = 'STOMP_ERROR',
  WS_CLOSED = 'WS_CLOSED',
  WS_ERROR = 'WS_ERROR'
}