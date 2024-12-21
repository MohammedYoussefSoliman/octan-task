import { Icon } from '@/components';
import { useBreakpoints } from '@/hooks';

import { Figure } from '../style';

export default function HeroIcon() {
  const { medium } = useBreakpoints();

  return (
    <Figure className="sticker">
      <Icon name="favorite-chart" size={medium ? 45 : 40} />
    </Figure>
  );
}
