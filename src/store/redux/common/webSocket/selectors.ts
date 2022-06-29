import { RootState } from "@store/redux/rootReducer";
import { EWebSocketStatus } from "@store/types";

export const webSocketStatusSelector: (state: RootState) => EWebSocketStatus = (state) => state.webSocket.status;
