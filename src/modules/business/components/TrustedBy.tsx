import { useTheme } from '@emotion/react';

import { Flex } from '@/components';
import { H6 } from '@/components/Typography';

import { TrustedLogo } from '../style';
import { TrustedByType } from '../types';

type Props = TrustedByType;

export default function TrustedBy({ title, logos }: Props) {
  const { pallet } = useTheme();

  return (
    <Flex
      direction="column"
      fullWidth
      gap={{ xs: 5, sm: 15, lg: 10 }}
      align="center"
      justify="center"
    >
      <H6 text={title} color={pallet.text.white} />
      <Flex
        direction="row"
        justify="space-between"
        mt={{ xs: 30, md: 47 }}
        withWrap
        fullWidth
      >
        {logos.map((item) => {
          return (
            <TrustedLogo key={item.id}>
              <img src={item.logo} alt={item.logo} />
            </TrustedLogo>
          );
        })}
      </Flex>
    </Flex>
  );
}
