import { Modal } from '@/components';
import modalKeys from '@/helpers/modalKeys';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { closeModal } from '@/state';

import BankAccountForm from './BankAccountForm';

export default function BankAccountModal() {
  const dispatch = useAppDispatch();
  const {
    uiActions: { modals },
  } = useAppSelector((state) => state);
  return (
    <Modal
      open={modals?.includes(modalKeys.addBankAccountModal)}
      onClose={() => dispatch(closeModal(modalKeys.addBankAccountModal))}
      title="addBank"
    >
      <BankAccountForm />
    </Modal>
  );
}
