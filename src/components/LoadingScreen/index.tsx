import { LoadingLogo } from '@/assets/lotties';

import Wrapper from './styles';

type Props = {
  background?: string;
};

export function LoadingScreen({ background }: Props) {
  return (
    <Wrapper background={background}>
      <LoadingLogo speed={0.5} size={400} />
    </Wrapper>
  );
}
