import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  PhoneNumberInput,
  NativeCheckbox,
  Flex,
  Button,
  Logo,
} from '@/components';
import { convertArabicDigitsToEnglish } from '@/helpers/functions';
import { useAppDispatch } from '@/hooks';
import { showError } from '@/state/ui-actions/slice';

import { sendOTP } from '../services';

import FormHeader from './FormHeader';
import Side from './styles';
import { FormDataType } from './types';

type Props = {
  handleNext: () => void;
};

export default function SendOTPStep({ handleNext }: Props) {
  const { control, getValues, setValue, trigger } =
    useFormContext<FormDataType>();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { pallet } = useTheme();

  const send = React.useCallback(
    async (event?: React.ChangeEvent<any>) => {
      event?.preventDefault();
      setLoading(true);
      try {
        const valid = await trigger('phoneNumber');
        if (valid) {
          const { phoneNumber, dialCode } = getValues();
          const response = await sendOTP({
            phone_number: `${dialCode}${convertArabicDigitsToEnglish(
              phoneNumber,
            )}`,
          });
          if (response.data && response.data.records) {
            // dispatch(showSuccess("otpSentToYourCellphone"));
            const { customerExists, nafath_verified: nafathVerified } =
              response.data.records;
            setValue('customerExists', customerExists);
            setValue('nafathVerified', nafathVerified);
            handleNext();
          }
        }
      } catch (err) {
        const error = err as any;
        const message = error?.response?.data?.errors[0]?.message;
        dispatch(showError(message));
      } finally {
        setLoading(false);
      }
    },
    [dispatch, getValues, handleNext, setValue, trigger],
  );

  return (
    <Flex
      direction={{
        xs: 'column',
        lg: 'row',
      }}
      fullWidth
      fullHeight
    >
      <Side
        pv={{ xs: '44px' }}
        className="left"
        align="center"
        justify="center"
      >
        <Logo
          color="white"
          size={{
            xs: 130,
            sm: 135,
            md: 150,
            lg: 250,
            xl: 360,
            xxl: 500,
          }}
        />
      </Side>
      <Side
        p={{ xs: '32px', md: '48px', xxl: '150px' }}
        justify="center"
        className="right"
      >
        <Flex gap={{ xs: 12, md: 25, lg: 50 }} fullWidth direction="column">
          <FormHeader />
          <Flex gap={{ xs: 6, md: 8 }} fullWidth direction="column">
            <PhoneNumberInput
              label="enterPhoneNumber"
              name="phoneNumber"
              control={control}
              required="phoneNumberRequired"
            />
            <NativeCheckbox
              checked
              label="rememberMe"
              name="rememberMe"
              onChange={(e) => {
                setValue('rememberMe', e.target.checked);
              }}
              fillColor={pallet.text.success}
            />
          </Flex>
          <Button isLoading={loading} onClick={send} fullWidth>
            next
          </Button>
        </Flex>
      </Side>
    </Flex>
  );
}
