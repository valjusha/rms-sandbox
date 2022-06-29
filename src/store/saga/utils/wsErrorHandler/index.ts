import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { EWebSocketStatus } from "@store/types";
import { WS, WSErrorHandlerCb } from "@wsUtils/wsUtils";
import { eventChannel, EventChannel, SagaIterator } from 'redux-saga';
import { call, cancelled, put, take } from 'redux-saga/effects';

type OnWebSocketErrorHandler =
  typeof WS.onWebSocketClose |
  typeof WS.onWebSocketError |
  typeof WS.onStompError |
  typeof WS.onDisconnect

type SagaWebSocketErrorHandler = [
  action: ActionCreatorWithPayload<EWebSocketStatus>,
  errorHandler: OnWebSocketErrorHandler
]

function wsErrorListener(cb: (msg: WSErrorHandlerCb) => EmptyCallback): EventChannel<any> {
  return eventChannel((emitter) => cb((msg: any) => {
    emitter(msg);
  }));
}

export function* sagaWebSocketErrorHandler(...props: SagaWebSocketErrorHandler): SagaIterator {
  const [action, errorHandler] = props;
  const channel = yield call(wsErrorListener, errorHandler);

  while (true) {
    try {
      const wsStatus: EWebSocketStatus = yield take(channel);
      yield put(action(wsStatus));
    } catch (err) {
      if (yield cancelled()) {
        channel.close();
        return;
      }
      console.error('Error in saga WebSocket error handler: ', err);
    }
  }
}
