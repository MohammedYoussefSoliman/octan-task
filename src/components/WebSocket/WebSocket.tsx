import { useAuth } from '@/hooks';

export default function WebSocket() {
  const { token } = useAuth();
  const source = new EventSource(
    `${
      process.env.REACT_APP_baseUrl
    }customer/check-nafath-status?token=${token?.value?.replace(
      'Bearer ',
      '',
    )}`,
  );

  source.onmessage = (e) => console.log(e.data);

  return (
    <div>
      <p>This is a websocket testing</p>
    </div>
  );
}
