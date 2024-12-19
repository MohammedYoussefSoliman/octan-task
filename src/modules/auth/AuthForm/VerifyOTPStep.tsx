import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CountDown, Flex, VerificationInput } from '@/components';
import InputError from '@/components/Inputs/InputError';
import { H3, H6, P1 } from '@/components/Typography';
import { formDataHandler } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import urls from '@/helpers/urls';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosInstance,
  useGetQuerySearch,
} from '@/hooks';
import loginService from '@/state/auth/loginService';
import {
  setRememberMe,
  setRequireNafathAuthentication,
} from '@/state/auth/slice';
import { closeModal, showError } from '@/state/ui-actions/slice';

import { sendOTP } from '../services';

import AuthPaper from './AuthPaper';
import { FormDataType } from './types';

type Props = {
  handleNext: () => void;
};
export default function VerifyOTPStep({ handleNext }: Props) {
  const { createOrder } = useGetQuerySearch();

  const { t } = useTranslation('app');
  const { post } = useAxiosInstance();
  const { getValues, setValue } = useFormContext<FormDataType>();
  const { pallet } = useTheme();
  const [sending, setSending] = React.useState<boolean>(false);
  const [countTime, setCountTime] = React.useState<number>(0);
  const [expired, setExpired] = React.useState<boolean>(false);
  const [otpHasError, setOtpHasError] = React.useState<boolean>(false);
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const dispatch = useAppDispatch();
  const {
    consumerAuth: { fireBaseToken },
    uiActions: { authMode },
  } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const { phoneNumber, dialCode, rememberMe, customerExists, nafathVerified } =
    getValues();

  const onVerifySuccess = React.useCallback(
    async (code: string) => {
      if (customerExists) {
        // complete login
        let formDataObj = {};
        if (fireBaseToken && fireBaseToken !== 'refused') {
          formDataObj = {
            'device_token[token]': fireBaseToken,
            'device_token[type]': 'web-consumer',
          };
        }
        const formData = formDataHandler({
          ...formDataObj,
          phone_number: `${dialCode}${phoneNumber}`,
          otp: code,
        });
        dispatch(
          loginService({
            formData,
            onSuccess() {
              dispatch(setRememberMe(rememberMe));
              if (nafathVerified) {
                dispatch(setRequireNafathAuthentication('verified'));
              } else {
                dispatch(setRequireNafathAuthentication('initial'));
              }
              if (authMode === 'page') {
                navigate(
                  `${urls.loginSuccess}${
                    createOrder ? `?createOrder=${createOrder}` : ''
                  }`,
                  {
                    state: { type: 'login' },
                  },
                );
              } else {
                dispatch(closeModal(modalKeys.checkOrderAuth));
              }
            },
          }),
        );
      } else {
        // go to next step to register
        handleNext();
      }
    },
    [
      customerExists,
      nafathVerified,
      fireBaseToken,
      dialCode,
      phoneNumber,
      dispatch,
      rememberMe,
      createOrder,
      authMode,
      navigate,
      handleNext,
    ],
  );

  const verifyOTP = React.useCallback(
    async (code: string) => {
      try {
        const { data } = await post(
          'customer/verifyOTP',
          formDataHandler({
            phone_number: `${dialCode}${phoneNumber}`,
            otp: code,
          }),
        );
        if (data.records.verify) {
          setValue('otp', code);
          onVerifySuccess(code);
        } else {
          setOtpHasError(true);
          setOtpError('otpError');
        }
      } catch (err) {
        const error = err as any;
        const message = error?.response?.data?.errors[0]?.message;
        dispatch(showError(message));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, dialCode, onVerifySuccess, phoneNumber],
  );

  React.useEffect(() => {
    setCountTime(120);
  }, []);

  return (
    <AuthPaper>
      <Flex
        gap={{ xs: 6, md: 8 }}
        direction="column"
        justify="center"
        align="center"
        maxWidth="500px"
      >
        <H3 text="verification" capitalizeFirstLetter />
        <P1 text="otpSentToYou" textAlign="center">
          {t('otpSentToYou', {
            number: `${dialCode}${phoneNumber}`,
          })}
        </P1>
      </Flex>
      {!expired && (
        <VerificationInput
          name="otp"
          verificationCodeLength={4}
          onFinish={verifyOTP}
          hasError={otpHasError}
        />
      )}
      {!expired && otpError && <InputError error={otpError} />}
      {countTime > 0 && (
        <CountDown
          time={countTime}
          withProgress
          onFinish={() => {
            setExpired(true);
          }}
          reset={sending}
        />
      )}
      {expired && (
        <P1
          text="expiredOTP"
          textAlign="center"
          capitalizeFirstLetter
          color={pallet.text.error}
        />
      )}
      <button
        onClick={async () => {
          setSending(true);
          setExpired(false);
          await sendOTP({
            phone_number: `${dialCode}${phoneNumber}`,
          });
          setSending(false);
        }}
        className="resend--button"
        aria-label="resend button"
        type="button"
        disabled={sending}
      >
        <H6
          text="resendCode"
          hover={{
            decoration: 'underline',
          }}
          color={pallet.primary[600]}
        />
      </button>
    </AuthPaper>
  );
}
