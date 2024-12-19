import {
  LogoWhite,
  LogoColored,
  LogoShapeColored,
  LogoShapeWhite,
  LogoShapeRed,
  LogoShapePurple,
} from '@/assets/svgs';
import { useBreakpoints } from '@/hooks';
import { ResponsiveSettings } from '@/theme/types';

type Props = {
  color?: 'white' | 'red' | 'purple' | 'colored';
  logoIcon?: boolean;
  size?: ResponsiveSettings<number> | number;
};

export function Logo({ color = 'colored', logoIcon, size }: Props) {
  let Component;
  if (logoIcon) {
    if (color === 'white') Component = LogoShapeWhite;
    else if (color === 'red') Component = LogoShapeRed;
    else if (color === 'purple') Component = LogoShapePurple;
    else Component = LogoShapeColored;
  } else {
    if (color === 'white') Component = LogoWhite;
    else Component = LogoColored;
  }

  const {
    small: sm,
    medium: md,
    large: lg,
    xLarge: xl,
    xxLarge: xxl,
    hd,
  } = useBreakpoints();

  const resolveSize = (size: ResponsiveSettings<number>): number => {
    if (hd) {
      return (
        size.hd ||
        size.xxl ||
        size.xl ||
        size.lg ||
        size.md ||
        size.sm ||
        size.xs
      );
    }
    if (xxl) {
      return size.xxl || size.xl || size.lg || size.md || size.sm || size.xs;
    }
    if (xl) {
      return size.xl || size.lg || size.md || size.sm || size.xs;
    }
    if (xl) {
      return size.xl || size.lg || size.md || size.sm || size.xs;
    }
    if (lg) {
      return size.lg || size.md || size.sm || size.xs;
    }
    if (md) {
      return size.md || size.sm || size.xs;
    }
    if (sm) {
      return size.sm || size.xs;
    }

    return size.xs;
  };

  const logoSize = (size?: ResponsiveSettings<number> | number) => {
    if (size) {
      if (typeof size === 'number') {
        return size;
      }
      return resolveSize(size);
    }
    return undefined;
  };

  return <Component size={logoSize(size)} />;
}
