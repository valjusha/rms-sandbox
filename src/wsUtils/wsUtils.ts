import { Client, messageCallbackType, StompHeaders } from '@stomp/stompjs';
import { StompConfig } from '@stomp/stompjs/esm6/stomp-config';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { IStompSocket } from '@stomp/stompjs/esm6/types';
import { EWebSocketStatus } from "@store/redux/types";
import sockjs from "sockjs-client/dist/sockjs"

interface StompClientType extends Omit<Client, 'webSocketFactory'> {
  webSocketFactory: (() => IStompSocket) | (() => WebSocket)
}

export type WSErrorHandlerCb = (errorType: EWebSocketStatus) => void;

export namespace WS {
  const subscriptionRequests = new Map();
  let client: StompClientType;

  const initStompClient = (url: string, stompClientOptions: StompConfig): void => {
    client = new Client(stompClientOptions);

    client.webSocketFactory = function () {
      const parsedUrl = new URL(url, window.location.href);
      if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
        return new sockjs(url);
      }
      if (
        parsedUrl.protocol === 'ws:' ||
        parsedUrl.protocol === 'wss:'
      ) {
        return new WebSocket(url);
      }
      throw new Error('Protocol not supported');
    };
  };

  const unsubscribe: (subscriptionId: string) => void = (subscriptionId) => {
    const subscriptionData = subscriptionRequests.get(subscriptionId);

    if (subscriptionData.subscription) {
      subscriptionData.subscription.unsubscribe();
    }
    subscriptionRequests.delete(subscriptionId);
  };

  const onConnect: (cb: EmptyCallback) => void = (cb) => {
    if (client) {
      client.onConnect = function () {
        if (client.connected) {
          cb();
        }
        subscriptionRequests.forEach(({ destination, EmptyCallback, headers }) => {
          if (client.connected) {
            client.subscribe(
              destination,
              EmptyCallback,
              headers
            );
          }
        });
      };
    }
  };

  export const onDisconnect = (EmptyCallback: WSErrorHandlerCb): EmptyCallback => {
    if (client) {
      client.onDisconnect = function () {
        EmptyCallback(EWebSocketStatus.DISCONNECTED);
      };
    }

    return () => {
    };
  };

  export const onWebSocketClose = (EmptyCallback: WSErrorHandlerCb): EmptyCallback => {
    if (client) {
      client.onWebSocketClose = function () {
        EmptyCallback(EWebSocketStatus.WS_CLOSED);
      };
    }
    return () => {
    };
  };

  export const onWebSocketError = (EmptyCallback: WSErrorHandlerCb): EmptyCallback => {
    if (client) {
      client.onWebSocketError = function () {
        EmptyCallback(EWebSocketStatus.WS_ERROR);
      };
    }
    return () => {
    };
  };

  export const onStompError = (EmptyCallback: WSErrorHandlerCb): EmptyCallback => {
    if (client) {
      client.onStompError = function () {
        EmptyCallback(EWebSocketStatus.STOMP_ERROR);
      };
    }
    return () => {
    };
  };

  const deactivate: EmptyCallback = () => {
    if (client) {
      client.deactivate()
        .then(() => {
          subscriptionRequests.forEach((_, subscriptionId) => {
            unsubscribe(subscriptionId);
          });
        })
        .catch((reject) => console.error(reject));
    }
  };

  export const activate = (
    url: string,
    stompClientOptions: StompConfig,
    activateCb: EmptyCallback,
    onConnectCb: EmptyCallback
  ): EmptyCallback => {
    initStompClient(url, stompClientOptions);
    client.activate();
    activateCb();
    onConnect(onConnectCb);
    return () => deactivate();
  };

  export const subscribe =
    (destination: string, EmptyCallback: messageCallbackType, headers: StompHeaders = {}): EmptyCallback => {
      let subscription: StompSubscription | undefined;

      if (client && client.connected) {
        subscription = client.subscribe(
          destination,
          EmptyCallback,
          headers
        );
      }

      const subscriptionRequest = {
        destination,
        EmptyCallback,
        headers,
        subscription
      };

      subscriptionRequests.set(destination, subscriptionRequest);

      return () => unsubscribe(destination);
    };

  export const publish = (destination: string, body: string): void => {
    if (client) {
      client.publish({ destination, body });
    }
  };
}
