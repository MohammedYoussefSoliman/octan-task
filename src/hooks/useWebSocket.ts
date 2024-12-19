import React from 'react';

import { useAuth } from '@/hooks';

type PusherSocketProps = {
  channelName?: string;
  event?: string;
};

export default function useWebSocket({
  channelName,
  event,
}: PusherSocketProps) {
  const user = useAuth();

  const websocket = new WebSocket(process.env.REACT_APP_WEBSOCKET!);

  const [data, setData] = React.useState(null);

  const apiCall = {
    event: event || 'nafath.customer.updated',
    data: { channel: channelName || `private.nafath.customer.${user.id}` },
  };

  websocket.onopen = () => {
    websocket.send(JSON.stringify(apiCall));
  };

  websocket.onmessage = (ev: MessageEvent<any>) => {
    const json = JSON.parse(ev.data);
    try {
      if (json.event) {
        setData(json.event);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return data;
}
