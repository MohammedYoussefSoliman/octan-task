import { Icon } from '@/components';
import { useBreakpoints } from '@/hooks';

import { Figure } from './styles';

export default function RefundIcon() {
  const { medium, large, xLarge } = useBreakpoints();

  return (
    <Figure className="sticker">
      <Icon
        name="exchange-shape"
        size={xLarge ? 60 : large ? 50 : medium ? 40 : 30}
      />
    </Figure>
  );
}
