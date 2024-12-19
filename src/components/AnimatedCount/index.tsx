import { useCountUp, CountUpProps } from 'react-countup';

import Counter from './styles';

interface Props extends Omit<CountUpProps, 'end'> {
  value: number;
  id: string;
}

export default function AnimatedCount({ value, id, ...rest }: Props) {
  useCountUp({
    ref: id,
    end: value,
    ...rest,
  });

  return <Counter id={id} />;
}
