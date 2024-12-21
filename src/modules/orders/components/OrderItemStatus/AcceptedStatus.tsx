import { useTheme } from '@emotion/react';

import { P3 } from '@/components/Typography';

import { BoxWrapper } from '../styles';

type Props = {
  reason?: string;
};

export default function AcceptedStatus({ reason }: Props) {
  const { colors, pallet } = useTheme();

  if (!reason) return null;

  return (
    <BoxWrapper
      p={{ xs: 6, md: 10 }}
      background={colors.green[100]}
      color={pallet.text.success}
      fullWidth
    >
      <P3 text={reason} color={pallet.text.success} capitalizeFirstLetter />
    </BoxWrapper>
  );
}
