import React from 'react';

import { useTheme } from '@emotion/react';

import {
  Icon,
  Button,
  Flex,
  Paper,
  BankAccountModal,
  BankAccountDelete,
} from '@/components';
import { P1, P2, P3, H5 } from '@/components/Typography';
import { splitter } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { openModal } from '@/state';
import { getBankAccounts } from '@/state/order/getBankAccounts';

import BankCard, { AccountsWrapper } from './styles';

export default function BankAccounts() {
  const dispatch = useAppDispatch();
  const { pallet, colors } = useTheme();
  const {
    consumerOrder: { bankAccounts },
  } = useAppSelector((state) => state);

  React.useEffect(() => {
    dispatch(getBankAccounts({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex fullWidth direction="column">
      <Flex
        align="center"
        justify="space-between"
        fullWidth
        mb={{ xs: 16, md: 30 }}
      >
        <H5 text="banks" />
        <Flex align="center" gap={16}>
          <Icon name="edit" color={pallet.primary[500]} />
          <P1 text="edit" color={pallet.primary[500]} />
        </Flex>
      </Flex>
      <Paper
        p={{
          xs: '16px',
          md: '30px 42px',
        }}
        fullWidth
      >
        <Flex direction="column" gap={{ xs: 16, sm: 20, lg: 30 }} fullWidth>
          <AccountsWrapper
            direction="column"
            gap={{ xs: 16, sm: 20, lg: 30 }}
            fullWidth
          >
            {bankAccounts?.map((account, index) => (
              <BankCard
                key={account.iban}
                direction="column"
                p={{ xs: 16, md: 20 }}
                gap={{ xs: 7, md: 15, lg: 30 }}
                gradient={index % 2 === 0 ? 'purple' : 'blue'}
                fullWidth
              >
                <Flex
                  direction="row"
                  justify="space-between"
                  align="center"
                  fullWidth
                >
                  <Flex align="center" justify="center" className="logo">
                    <img
                      className="logo--image"
                      src={account?.bank?.logo}
                      alt="bank_logo"
                    />
                  </Flex>
                  <BankAccountDelete id={account.id} />
                </Flex>
                <Flex
                  gap="24px"
                  direction={{ xs: 'column', lg: 'row' }}
                  fullWidth
                >
                  <Flex direction="column" className="info">
                    <P3
                      text="accountHolderName"
                      color={colors.shades[100]}
                      uppercase
                    />
                    <P2
                      text={`${account.first_name} ${
                        account.middle_name ? account.middle_name : ''
                      } ${account.last_name}`}
                      color={colors.shades[100]}
                      weight={600}
                      capitalizeFirstLetter
                    />
                  </Flex>
                  <Flex
                    className="info"
                    direction="column"
                    ps={{ xs: 0, md: 30, lg: 40, xl: 80 }}
                  >
                    <P3 text="iban" color={colors.shades[100]} uppercase />
                    <P2
                      text={splitter({
                        phrase: account.iban,
                        splitAt: 4,
                      }).join(' ')}
                      color={colors.shades[100]}
                      weight={600}
                    />
                  </Flex>
                </Flex>
              </BankCard>
            ))}
          </AccountsWrapper>
          <Button
            onClick={() => dispatch(openModal(modalKeys.addBankAccountModal))}
            variant="secondary"
            fullWidth
          >
            <Flex gap="16px" align="center">
              <Icon name="plus-circle" size={28} color={pallet.primary[500]} />
              <P2 text="addBank" color={pallet.primary[600]} />
            </Flex>
          </Button>
          <BankAccountModal />
        </Flex>
      </Paper>
    </Flex>
  );
}
