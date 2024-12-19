import { useAuth } from '@/hooks';

import GuestUser from './GuestUser';
import LoggedUser from './LoggedUser';

type Props = {
  transparentMode: boolean;
  scrolledView: boolean;
};

export default function ActionBar({ transparentMode, scrolledView }: Props) {
  const { loggedIn } = useAuth();
  if (loggedIn) return <LoggedUser transparentMode={transparentMode} />;
  return (
    <GuestUser scrolledView={scrolledView} transparentMode={transparentMode} />
  );
}
