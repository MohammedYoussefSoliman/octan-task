import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  BankAccountDelete,
  BankAccountModal,
  Flex,
  Button,
  Icon,
  P1,
  P2,
  P3,
} from '@/components';
import RadioOption from '@/components/Inputs/RadioInput/RadioOption';
import { splitter } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { openModal } from '@/state/ui-actions/slice';
import { StoreBranding } from '@/theme/types';

import BankCard, { AccountsWrapper } from './styles';

export default function BankList({ branding }: { branding: StoreBranding }) {
  const dispatch = useAppDispatch();
  const {
    consumerOrder: { bankAccounts },
  } = useAppSelector((state) => state);

  const { pallet, colors } = useTheme();
  const { setValue, getValues } = useFormContext();
  const [activeValue, setActiveValue] = React.useState<string>(
    getValues('bankId'),
  );

  const selectBankAccount = (bankAccountId: string) => {
    setValue('bankId', bankAccountId);
    setActiveValue(bankAccountId);
    setValue('bankAccountId', bankAccountId);
  };

  React.useEffect(() => {
    if (bankAccounts?.length === 1) {
      selectBankAccount(String(bankAccounts[0].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      ps={{ xs: 0, lg: 30 }}
      direction="column"
      gap={{ xs: 10, md: 20, lg: 40 }}
      fullWidth
    >
      <AccountsWrapper
        ps={{ xs: 1, lg: 30 }}
        direction="column"
        gap={{ xs: 10, md: 20, lg: 40 }}
        fullWidth
      >
        {bankAccounts?.map((account: any, index: number) => (
          <Flex key={account.iban} gap={{ xs: 7, md: 15, lg: 30 }} fullWidth>
            <RadioOption
              name="bankId"
              value={String(account.id)}
              activeValue={activeValue}
              changeHandler={(e) => {
                selectBankAccount(e.target.value);
              }}
            />
            <Flex direction="column" gap={{ xs: 7, md: 15, lg: 30 }} flex={1}>
              <P1
                text={account?.bank?.name}
                weight={activeValue === account.id ? 500 : 400}
                color={
                  activeValue === account.id
                    ? pallet.text.heading
                    : pallet.text.body
                }
                capitalizeFirstLetter
              />
              <BankCard
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
                  gap={{ xs: 6, md: 12, lg: 24 }}
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
                      text={splitter({ phrase: account.iban, splitAt: 4 }).join(
                        ' ',
                      )}
                      color={colors.shades[100]}
                      weight={600}
                    />
                  </Flex>
                </Flex>
              </BankCard>
            </Flex>
          </Flex>
        ))}
      </AccountsWrapper>
      <Button
        onClick={() => dispatch(openModal(modalKeys.addBankAccountModal))}
        variant="secondary"
        color={branding.primaryColor ?? pallet.primary[500]}
        fullWidth
      >
        <Flex gap={{ xs: 5, md: 8, lg: 16 }} align="center">
          <Icon
            name="plus-circle"
            size={28}
            color={branding.primaryColor ?? pallet.primary[500]}
          />
          <P2
            text="addBank"
            color={branding.primaryColor ?? pallet.primary[500]}
          />
        </Flex>
      </Button>
      <BankAccountModal />
    </Flex>
  );
}
