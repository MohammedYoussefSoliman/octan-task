import { useTheme } from '@emotion/react';

import { Flex, Icon } from '@/components';
import { Figure as ShapeSticker } from '@/components/Cards/styles';
import { P2, H4 } from '@/components/Typography';
import { useAppSelector } from '@/hooks';

import CreateOrderButton from './styles';

type Props = {
  onCreateOrderClicked: () => void;
};

export default function CreateOrderBox({ onCreateOrderClicked }: Props) {
  const {
    ui: { language },
  } = useAppSelector((state) => state);
  const { pallet } = useTheme();

  return (
    <Flex
      pt={{ xs: 32, md: 24, lg: 58 }}
      direction="row"
      justify="space-between"
      align="center"
      fullWidth
    >
      <H4 text="yourRefundOrders" />
      <CreateOrderButton
        p={{ xs: 12, md: 16 }}
        as="button"
        width="fit-content"
        align="center"
        direction="row"
        gap={{ xs: 6, md: 12, lg: 24 }}
        justify="space-between"
        onClick={() => onCreateOrderClicked()}
      >
        <Flex align="center" gap={{ xs: 7, md: 10, lg: 18 }}>
          <ShapeSticker dense>
            <Icon name="exchange-shape" size={30} />
          </ShapeSticker>
          <P2
            text="applyForOrder"
            capitalizeFirstLetter
            weight={500}
            color={pallet.text.heading}
          />
        </Flex>
        <Icon
          name={`arrow-${language === 'ar' ? 'left' : 'right'}`}
          size={24}
        />
      </CreateOrderButton>
    </Flex>
  );
}
