import { Icon } from '@/components';

import StyledFigure from './styles';

type Props = {
  url?: string | null;
  alt: string;
};

export default function Picture({ url, alt }: Props) {
  return (
    <StyledFigure>
      {url ? (
        <img className="image" src={url} alt={alt} />
      ) : (
        <Icon name="grey-logo-shape" size={60} />
      )}
    </StyledFigure>
  );
}
