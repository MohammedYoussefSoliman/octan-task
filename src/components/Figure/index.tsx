import { CSSProperties } from 'react';

import { Icon } from '@/components';

import StyledFigure from './styles';

type Props = {
  url?: string | null;
  alt: string;
  dense?: boolean;
  withPadding?: boolean;
  imageBehavior?: CSSProperties['objectFit'];
};

export default function Figure({
  url,
  alt,
  dense,
  withPadding,
  imageBehavior,
}: Props) {
  return (
    <StyledFigure
      dense={dense}
      withPadding={withPadding}
      imageBehavior={imageBehavior}
    >
      {url ? (
        <img className="image" src={url} alt={alt} />
      ) : (
        <Icon name="grey-logo-shape" size={60} />
      )}
    </StyledFigure>
  );
}
