import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { WS } from '@wsUtils/wsUtils';

interface Payload extends PayloadAction {
  payload: any
}

export function* sagaSendMessage(destination: string, { payload }: Payload): SagaIterator {
  yield call(WS.publish, destination, JSON.stringify(payload));
}
