import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from "@store/types";
import { EventChannel, eventChannel, SagaIterator } from 'redux-saga';
import {
  call, cancelled, put, take
} from 'redux-saga/effects';
import { WS } from '@wsUtils/wsUtils';

const subscriptionChannels = new Map<string, EventChannel<any>>();

function createSubscriptionListener(destination: string): EventChannel<any> {
  return eventChannel((emitter) => WS.subscribe(destination, (msg) => {
    emitter(msg.body);
  }));
}

/**
 * statusAction должен иметь значение не равное ActionCreatorWithPayload (false),
 * потому что при вызове sagaSubscribe (takeLatest, takeEvery, takeLeading...)
 * последним параметром неявно передаются данный того action`а, который порадил вызов саги.
 *
 */
type SagaSubscribe = [
  destination: string,
  action: ActionCreatorWithPayload<any>,
  statusAction: ActionCreatorWithPayload<RequestStatus> | false,
  triggerAction: PayloadAction
]

export function* sagaSubscribe(...props: SagaSubscribe): SagaIterator {
  const [destination, action, statusAction] = props;
  let channel: EventChannel<void>;
  try {
    channel = yield call(createSubscriptionListener, destination);
    subscriptionChannels.set(destination, channel);

    if (statusAction && statusAction.type) {
      yield put(statusAction(RequestStatus.LOADING));
    }
  } catch (channelErr) {
    if (statusAction && statusAction.type) {
      yield put(statusAction(RequestStatus.FAILED));
    }
    throw channelErr;
  }
  while (true) {
    try {
      const message: string = yield take(channel);
      yield put(action(JSON.parse(message)));
      if (statusAction && statusAction.type) {
        yield put(statusAction(RequestStatus.SUCCEEDED));
      }
    } catch (err) {
      if (statusAction && statusAction.type) {
        yield put(statusAction(RequestStatus.FAILED));
      }
      if (yield cancelled()) {
        channel.close();
        return;
      }
      console.error(`Error in saga task for destination subscription of  '${destination}'`, err);
    }
  }
}

export function sagaUnsubscribe(destination: string): void {
  const subscriptionChannel = subscriptionChannels.get(destination);

  if (subscriptionChannel !== undefined) {
    subscriptionChannel.close();
  }
}
