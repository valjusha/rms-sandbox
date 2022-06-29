import { RootState } from "@store/redux/rootReducer";
import { EWebSocketStatus } from "@store/redux/types";

export const webSocketStatusSelector: (state: RootState) => EWebSocketStatus = (state) => state.webSocket.status;
