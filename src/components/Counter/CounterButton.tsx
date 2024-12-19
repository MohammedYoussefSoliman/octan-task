import { useTheme } from '@emotion/react';

import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';

import { Button } from './styles';

type Props = {
  onClick: () => void;
  type: 'minus' | 'plus';
  disabled?: boolean;
};

export default function CounterButton({ onClick, disabled, type }: Props) {
  const { medium } = useBreakpoints();
  const { colors, pallet } = useTheme();
  return (
    <Button onClick={onClick} disabled={disabled}>
      <Icon
        color={disabled ? colors.grey[400] : pallet.primary[500]}
        name={type}
        size={medium ? 24 : 20}
      />
    </Button>
  );
}
