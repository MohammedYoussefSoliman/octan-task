import React from 'react';

import { Flex, IconButton, Icon, P2, H5, H4 } from '@/components';
import { Figure as ShapeSticker } from '@/components/Cards/styles';
import { useAppSelector } from '@/hooks';

import CreateOrderButton from './styles';

type Props = {
  onCreateOrderClicked: () => void;
};

export default function CreateOrderBoxResponsive({
  onCreateOrderClicked,
}: Props) {
  const {
    ui: { language },
  } = useAppSelector((state) => state);

  return (
    <Flex
      pt="32px"
      gap="44px"
      direction="column"
      justify="space-between"
      align="flex-start"
      fullWidth
    >
      <H4 text="welcome" />
      <CreateOrderButton
        p="12px"
        align="center"
        direction="column"
        gap="24px"
        fullWidth
      >
        <Flex justify="space-between" fullWidth>
          <ShapeSticker dense>
            <Icon name="exchange-shape" size={30} />
          </ShapeSticker>
          <IconButton
            variant="light"
            icon={`arrow-${language === 'ar' ? 'left' : 'right'}`}
            size="lg"
            onClick={() => onCreateOrderClicked()}
          />
        </Flex>
        <Flex direction="column" gap="8px" align="flex-start" fullWidth>
          <H5 text="applyRefund" />
          <P2 text="selectYamm" textAlign="start" />
        </Flex>
      </CreateOrderButton>
    </Flex>
  );
}
