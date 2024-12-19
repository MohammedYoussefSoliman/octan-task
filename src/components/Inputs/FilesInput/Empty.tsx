import { useTheme } from '@emotion/react';

import { Icon } from '@/components/Icon';

import type { EmptyButtonProps } from './types';

import { EmptyBtn } from './styles';

export default function EmptyFile({ disabled }: EmptyButtonProps) {
  const { pallet, colors, branding } = useTheme();

  return (
    <EmptyBtn disabled={disabled}>
      <Icon
        name="plus"
        color={
          disabled
            ? colors.grey[400]
            : (branding.primaryColor ?? pallet.primary[500])
        }
      />
    </EmptyBtn>
  );
}
