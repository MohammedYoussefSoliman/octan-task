import React from 'react';

import { useAuth } from '@/hooks';

export default function useEventSource() {
  const { token } = useAuth();

  const [data, setData] = React.useState<any>(null);

  const doSSe = React.useCallback(() => {
    const source = new EventSource(
      `${
        process.env.REACT_APP_baseUrl
      }customer/check-nafath-status?token=${token?.value?.replace(
        'Bearer ',
        '',
      )}`,
    );
    source.onmessage = (e) => {
      if (e.data) {
        setData(JSON.parse(e.data));
      }
    };
    return source;
  }, [token?.value]);

  return {
    data,
    doSSe,
  };
}
