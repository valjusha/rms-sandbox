import { getWebSocketErrors } from "@store/redux/common/webSocket/actions";
import { setWebSocketStatus } from "@store/redux/common/webSocket/slice";
import { EWebSocketStatus } from "@store/types";
import React, { useEffect } from 'react';
// import { useKeycloak } from '@react-keycloak/web';
import { useDispatch } from 'react-redux';
import { SOCKET_URL } from "./constants";
import { WS } from "./wsUtils";


const WebSocketProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // const { keycloak } = useKeycloak();
  const dispatch = useDispatch();

  useEffect(() => {
    const stompOptions = {
      connectHeaders: {
        // Authorization: `Bearer ${keycloak.token}`
      },
      debug: (STOMP: string) => console.log(STOMP)
    };

    const cleanUp = WS.activate(SOCKET_URL, stompOptions,
      () => {
        dispatch(getWebSocketErrors());
      },
      () => {
        dispatch(setWebSocketStatus(EWebSocketStatus.CONNECTED));
      });

    return () => {
      cleanUp();
    };
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default WebSocketProvider;
