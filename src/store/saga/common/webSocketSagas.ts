import { getWebSocketErrors } from "@store/redux/common/webSocket/actions";
import { setWebSocketStatus } from "@store/redux/common/webSocket/slice";
import { sagaWebSocketErrorHandler } from "@store/saga/utils/wsErrorHandler";
import { SagaIterator } from "redux-saga";
import { takeLeading } from "redux-saga/effects";
import { WS } from "@wsUtils/wsUtils";


export default function* webSocketErrorSaga(): SagaIterator {
  yield takeLeading(getWebSocketErrors.type, sagaWebSocketErrorHandler, setWebSocketStatus, WS.onWebSocketClose);
  yield takeLeading(getWebSocketErrors.type, sagaWebSocketErrorHandler, setWebSocketStatus, WS.onWebSocketError);
  yield takeLeading(getWebSocketErrors.type, sagaWebSocketErrorHandler, setWebSocketStatus, WS.onStompError);
  yield takeLeading(getWebSocketErrors.type, sagaWebSocketErrorHandler, setWebSocketStatus, WS.onDisconnect);
}
