import { useTheme } from '@emotion/react';

import { P2 } from '@/components';

import Wrapper from './styles';

type Props = {
  image?: string;
  abbreviation: string;
};

export function Avatar({ image, abbreviation }: Props) {
  const { colors } = useTheme();
  return (
    <Wrapper>
      {image ? (
        <img src={image} alt="avatar_image" />
      ) : (
        <P2
          text={abbreviation}
          weight={600}
          color={colors.shades[100]}
          uppercase
        />
      )}
    </Wrapper>
  );
}
