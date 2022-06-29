import webSocketErrorSaga from "@store/saga/common/webSocketSagas";
import eventsSaga from "@store/saga/domain/events";
import { SagaIterator } from 'redux-saga';
import { all, AllEffect } from 'redux-saga/effects';


export default function* rootWatcher(): Generator<AllEffect<SagaIterator>, void> {
  yield all([
    eventsSaga(),
    webSocketErrorSaga()
  ]);
}
