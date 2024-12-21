import { useTheme } from '@emotion/react';

import { Flex, P3, Small, Icon } from '@/components';

type Props = {
  title: string;
  value: string;
  type: 'deduction' | 'addition';
};

export default function OrderTooltipDetails({ title, value, type }: Props) {
  const { pallet } = useTheme();
  return (
    <Flex gap="4px" align="center">
      <Flex width="120px">
        <P3 text={title} endAdornment=":" capitalizeFirstLetter />
      </Flex>
      <Icon
        size={12}
        name={`${type === 'deduction' ? 'minus' : 'plus'}-circle`}
        color={pallet.text[type === 'deduction' ? 'error' : 'success']}
      />
      <Small text={value} color={pallet.text.heading} />
    </Flex>
  );
}
