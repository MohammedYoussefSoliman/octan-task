import Swiper from 'swiper';

import { IconButton } from '../Buttons';

type Props = {
  direction: 'right' | 'left';
  swiper: Swiper;
  className?: string;
};

export default function NavButton({ direction, className, swiper }: Props) {
  return (
    <IconButton
      onClick={() => {
        if (direction === 'left') swiper.slideNext();
        else swiper.slidePrev();
      }}
      type="button"
      icon={`chevron-${direction}`}
      className={className}
      // variant="secondary"
      size="sm"
    />
  );
}
