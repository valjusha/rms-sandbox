import { createAction } from '@reduxjs/toolkit';
import { WEB_SOCKET_ERRORS_HANDLER } from "@store/redux/consts";

export const getWebSocketErrors = createAction(WEB_SOCKET_ERRORS_HANDLER);
