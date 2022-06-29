import { SUBSCRIBE_TO_SHIFT_EVENTS, SUBSCRIBE_TO_TASK_EVENTS } from "@store/redux/consts";
import {
  subscribeToShiftEvents,
  subscribeToTaskEvents,
  unsubscribeFromShiftEvents,
  unsubscribeFromTaskEvents
} from "@store/redux/domain/events/actions";
import { setShiftEvents } from "@store/redux/domain/events/shift";
import { setShiftEventsRequestStatus, setTaskEventsRequestStatus } from "@store/redux/domain/events/slice";
import { setTaskEvents } from "@store/redux/domain/events/task";
import { sagaSubscribe, sagaUnsubscribe } from "@store/saga/utils";
import { SHIFT_EVENTS_TOPIC, TASK_EVENTS_TOPIC } from "@wsUtils/constants";
import { SagaIterator } from "redux-saga";
import { takeEvery } from 'redux-saga/effects';

export default function* eventsSaga(): SagaIterator {
  yield takeEvery(
    subscribeToTaskEvents.type,
    sagaSubscribe,
    TASK_EVENTS_TOPIC,
    setTaskEvents,
    setTaskEventsRequestStatus
  );

  yield takeEvery(
    unsubscribeFromTaskEvents.type,
    sagaUnsubscribe,
    SUBSCRIBE_TO_TASK_EVENTS
  );

  yield takeEvery(
    subscribeToShiftEvents.type,
    sagaSubscribe,
    SHIFT_EVENTS_TOPIC,
    setShiftEvents,
    setShiftEventsRequestStatus
  );

  yield takeEvery(
    unsubscribeFromShiftEvents.type,
    sagaUnsubscribe,
    SUBSCRIBE_TO_SHIFT_EVENTS
  );

}