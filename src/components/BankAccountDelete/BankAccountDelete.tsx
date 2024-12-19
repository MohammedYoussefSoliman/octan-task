import React from 'react';

import { useTheme } from '@emotion/react';

import { IconButton, ConfirmModal } from '@/components';
import { useAxiosInstance, useAppDispatch } from '@/hooks';
import { getBankAccounts, showError } from '@/state';

type Props = {
  id: number;
};

export default function AccountDelete({ id }: Props) {
  const { pallet } = useTheme();
  const { delete: deleteAccount } = useAxiosInstance();
  const dispatch = useAppDispatch();
  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);

  const confirmDelete = React.useCallback(async () => {
    deleteAccount(`customer/bankAccounts/${id}`)
      .then(() => {
        setOpenConfirmModal(false);
        dispatch(getBankAccounts({}));
      })
      .catch((error) => {
        if ((error as any).response.data) {
          dispatch(
            showError((error as any).response?.data?.errors[0]?.message),
          );
        }
      });
  }, [dispatch, deleteAccount, id]);

  return (
    <>
      <IconButton
        iconColor={pallet.text.body}
        variant="light"
        size="sm"
        icon="times"
        onClick={() => setOpenConfirmModal(true)}
      />
      <ConfirmModal
        open={openConfirmModal}
        heading="sureDeletingAccount"
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={confirmDelete}
        buttonLabel="delete"
      />
    </>
  );
}
