import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Flex, Icon, H6, P2 } from '@/components';
import RadioOption from '@/components/Inputs/RadioInput/RadioOption';
import { useAppSelector } from '@/hooks';

import { ItemCard } from '../../styles';

type Props = {
  setActiveValue: (val: string) => void;
  activeValue?: string;
};

export default function AddressesList({ setActiveValue, activeValue }: Props) {
  const {
    consumerOrder: { addressBook },
  } = useAppSelector((state) => state);
  const { setValue } = useFormContext();
  const { pallet } = useTheme();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('addressId', e.target.value);
    setActiveValue(e.target.value);
  };

  return (
    <>
      {addressBook?.map((item) => (
        <ItemCard
          gap={{ xs: 6, md: 8, lg: 16 }}
          key={item.address_line}
          fullWidth
        >
          <RadioOption
            name="addressId"
            value={item.id}
            activeValue={activeValue}
            changeHandler={changeHandler}
          />
          <Flex
            mt={-8}
            gap={{ xs: 6, md: 10, lg: 20 }}
            direction="column"
            flex={1}
          >
            {item.label && <H6 text={item.label} capitalizeFirstLetter />}
            <Flex
              p={{ xs: 16, md: 24 }}
              className="address-wrapper"
              align="center"
              gap={{ xs: 5, md: 10 }}
              fullWidth
            >
              <Icon name="location" />
              <P2
                text={item.address_line}
                color={pallet.text.heading}
                capitalizeFirstLetter
              />
            </Flex>
          </Flex>
        </ItemCard>
      ))}
    </>
  );
}
