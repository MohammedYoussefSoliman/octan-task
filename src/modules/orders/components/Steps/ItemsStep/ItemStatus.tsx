import { useTheme } from '@emotion/react';

import { Small } from '@/components/Typography';

import { ItemStatus as StyledItemStatus } from '../../styles';

type Props = {
  canBeRefunded: boolean;
};

export default function ItemStatus({ canBeRefunded }: Props) {
  const theme = useTheme();

  return (
    <StyledItemStatus status={canBeRefunded ? 'success' : 'error'}>
      <Small
        text={canBeRefunded ? 'canBeRefunded' : 'canNotBeRefunded'}
        weight={500}
        color={theme.colors.shades[100]}
        capitalizeFirstLetter
      />
    </StyledItemStatus>
  );
}
