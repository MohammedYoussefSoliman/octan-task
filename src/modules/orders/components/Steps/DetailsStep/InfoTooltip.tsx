import { useTheme } from '@emotion/react';

import { Divider, Flex, P3, Small, Icon, Tooltip } from '@/components';
import { useBreakpoints } from '@/hooks';

import OrderTooltipDetails from './OrderTooltipDetails';
import { PricingObject } from './types';

type Props = {
  total: string;
  deduction?: PricingObject[];
  addition?: PricingObject[];
  refundAmount: string;
};

type InfoTooltipProps = Props & {
  color?: string;
};

function TooltipTitle({ total, deduction, addition, refundAmount }: Props) {
  const { pallet } = useTheme();

  return (
    <Flex p={{ xs: 6, lg: 10 }} direction="column">
      <Flex gap="4px" align="center">
        <Flex width="120px">
          <P3 text="total" endAdornment=":" capitalizeFirstLetter />
        </Flex>
        <Small text={`${total}`} color={pallet.text.heading} />
      </Flex>
      {deduction &&
        deduction.map((item) => {
          return (
            <OrderTooltipDetails
              title={item.title}
              value={item.value}
              type="deduction"
            />
          );
        })}
      <Divider />
      {addition &&
        addition.map((item) => {
          return (
            <OrderTooltipDetails
              title={item.title}
              value={item.value}
              type="addition"
            />
          );
        })}
      <Divider />
      <Flex gap="4px" align="center">
        <Flex width="100px">
          <P3 text="refundTotal" endAdornment=":" capitalizeFirstLetter />
        </Flex>
        <Small text={refundAmount} color={pallet.text.heading} weight={500} />
      </Flex>
    </Flex>
  );
}

export default function InfoTooltip({ color, ...props }: InfoTooltipProps) {
  const { pallet, shadows } = useTheme();
  const { medium } = useBreakpoints();

  return (
    <Tooltip
      enterTouchDelay={medium ? 700 : 0}
      title={<TooltipTitle {...props} />}
      tooltipStyles={{
        background: pallet.secondary[100],
        boxShadow: shadows[1],
        borderRadius: 10,
      }}
      arrowStyles={{ color: pallet.secondary[100], fontSize: '2rem' }}
      arrow
    >
      <Icon size={20} name="info" color={color || pallet.primary[600]} />
    </Tooltip>
  );
}
