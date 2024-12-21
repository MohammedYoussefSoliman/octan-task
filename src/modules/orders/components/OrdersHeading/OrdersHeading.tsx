import React from 'react';

import { Modal } from '@/components/Modal';
import { useBreakpoints } from '@/hooks';

import CheckOrderForm from './CheckOrderForm';
import HeadingDetails from './HeadingDetails';
import HeadingDetailsResponsive from './HeadingDetailsResponsive';

export default React.memo(function LoggedInHome() {
  const { medium } = useBreakpoints();
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  return (
    <>
      {medium && (
        <HeadingDetails onCreateOrderClicked={() => setOpenModal(true)} />
      )}
      {!medium && (
        <HeadingDetailsResponsive
          onCreateOrderClicked={() => setOpenModal(true)}
        />
      )}
      <Modal
        title="createRefundOrder"
        open={openModal}
        onClose={() => setOpenModal(false)}
        cardWidth={{
          xs: '90% !important',
          md: '80% !important',
          lg: '700px !important',
        }}
      >
        <CheckOrderForm onClose={() => setOpenModal(false)} />
      </Modal>
    </>
  );
});
