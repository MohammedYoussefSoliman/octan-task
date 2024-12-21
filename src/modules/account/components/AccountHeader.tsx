import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { H4, Flex, Avatar, GoBack } from '@/components';
import { firstLetter } from '@/helpers/functions';

type Props = {
  firstName: string;
  lastName: string;
  image?: string;
};

export default function AccountHeader({ firstName, lastName, image }: Props) {
  const { pallet } = useTheme();
  const { t } = useTranslation('app');
  const abbreviation = React.useMemo(
    () => firstLetter(firstName, lastName),
    [firstName, lastName],
  );

  return (
    <Flex
      align="center"
      justify="flex-start"
      gap={{ xs: 10, md: 17, lg: 35 }}
      fullWidth
      direction="column"
    >
      <Flex
        align="center"
        justify="flex-start"
        gap={{ xs: 6, md: 10, lg: 20 }}
        fullWidth
      >
        <GoBack />
      </Flex>
      <Flex
        align="center"
        justify="flex-start"
        gap={{ xs: 6, md: 10, lg: 20 }}
        fullWidth
      >
        <Avatar image={image} abbreviation={abbreviation} />
        <H4 weight={500} color={pallet.text.heading}>
          {t('hi', { firstName, lastName })}
        </H4>
      </Flex>
    </Flex>
  );
}
