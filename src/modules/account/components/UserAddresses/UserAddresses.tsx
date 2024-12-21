/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { useTheme } from '@emotion/react';

import { AddressDelete, Button, Flex, Icon, Modal, Paper } from '@/components';
import { H5, H6, P2, P1, P3 } from '@/components/Typography';
import modalKeys from '@/helpers/modalKeys';
import { useAppSelector, useAppDispatch, useBreakpoints } from '@/hooks';
import { getAddresses } from '@/state/order/addressesServices';
import { openModal, closeModal } from '@/state/ui-actions/slice';

import { OutlinedPaper } from '../../style';

import MapUserAddressSelect from './MapUserAddressSelect';

export default function UserAddresses() {
  const dispatch = useAppDispatch();
  const { medium } = useBreakpoints();
  const {
    consumerOrder: { addressBook },
    uiActions: { modals },
  } = useAppSelector((state) => state);
  const { pallet } = useTheme();

  React.useEffect(() => {
    dispatch(getAddresses({}));
  }, []);

  return (
    <Flex fullWidth direction="column">
      <Flex
        align="center"
        justify="space-between"
        fullWidth
        mb={{ xs: 16, md: 30 }}
      >
        <H5 text="address" />
        <Flex align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
          <Icon name="edit" color={pallet.primary[500]} />
          <P1 text="edit" color={pallet.primary[500]} />
        </Flex>
      </Flex>
      <Paper
        p={{
          xs: '10px',
          md: '30px 42px',
        }}
        fullWidth
      >
        <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} fullWidth>
          {addressBook?.map((item) => (
            <OutlinedPaper
              gap={{ xs: 6, md: 8, lg: 16 }}
              key={item.id}
              fullWidth
            >
              <Flex gap={{ xs: 6, md: 10, lg: 20 }} direction="column" flex={1}>
                {item.label && <H6 text={item.label} capitalizeFirstLetter />}
                <Flex
                  className="address-wrapper"
                  align={medium ? 'center' : 'start'}
                  gap={{ xs: 8, md: 16, lg: 30 }}
                  fullWidth
                  justify="space-between"
                >
                  <Flex align="center" gap={{ xs: 10 }} fullWidth>
                    {medium && <Icon name="location" />}
                    <P3
                      text={item.address_line}
                      color={pallet.text.heading}
                      capitalizeFirstLetter
                    />
                  </Flex>

                  <AddressDelete id={item.id} />
                </Flex>
              </Flex>
            </OutlinedPaper>
          ))}
          <Button
            onClick={() => dispatch(openModal(modalKeys.addAddressModal))}
            variant="secondary"
            fullWidth
          >
            <Flex gap={{ xs: 6, md: 8, lg: 16 }} align="center">
              <Icon name="plus-circle" size={28} color={pallet.primary[500]} />
              <P2 text="addAddress" color={pallet.primary[600]} />
            </Flex>
          </Button>
        </Flex>
      </Paper>
      <Modal
        open={modals?.includes(modalKeys.addAddressModal)}
        onClose={() => dispatch(closeModal(modalKeys.addAddressModal))}
        title="selectAddress"
      >
        <MapUserAddressSelect />
      </Modal>
    </Flex>
  );
}
