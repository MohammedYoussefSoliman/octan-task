/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useTheme } from '@emotion/react';

import { IconButton, ConfirmModal } from '@/components';
import { useAppDispatch, useAxiosInstance } from '@/hooks';

import { getAddresses, showError } from '@/state';

type Props = {
  id: number;
  onAddressDeleted?: () => void;
};

export default function UserAddressDelete({ id, onAddressDeleted }: Props) {
  const { pallet } = useTheme();
  const { delete: deleteAddress } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);

  const confirmDelete = React.useCallback(async () => {
    deleteAddress(`customer/addresses/${id}`)
      .then(() => {
        setOpenConfirmModal(false);
        dispatch(getAddresses({}));
        if (onAddressDeleted) onAddressDeleted();
      })
      .catch((error) => {
        if ((error as any).response.data) {
          dispatch(
            showError((error as any).response?.data?.errors[0]?.message),
          );
        }
      });
  }, [dispatch, deleteAddress, id, onAddressDeleted]);

  return (
    <>
      <IconButton
        iconColor={pallet.text.body}
        variant="transparent"
        size="sm"
        icon="times"
        onClick={() => setOpenConfirmModal(true)}
      />
      <ConfirmModal
        open={openConfirmModal}
        heading="sureDeleting"
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={confirmDelete}
        buttonLabel="delete"
      />
    </>
  );
}
