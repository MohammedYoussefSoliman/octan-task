import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Flex, Modal, NativeVerificationInput, Icon } from '@/components';
import { H3, P1, P2 } from '@/components/Typography';
import { formDataHandler } from '@/helpers/functions';
import { useAxiosInstance } from '@/hooks';

import { OTPVerificationWrapper } from '../../styles';

type ConfirmOtpModalProps = {
  open: boolean;
  onClose: () => void;
  phoneNumber: string;
  storeAgreementUrl: string;
  storeName: string;
  submitOrder: () => Promise<void>;
};

export default function ConfirmOtpModal({
  open,
  phoneNumber,
  storeAgreementUrl,
  storeName,
  onClose,
  submitOrder,
}: ConfirmOtpModalProps) {
  const navigate = useNavigate();
  const { post } = useAxiosInstance();
  const { colors, pallet } = useTheme();
  const { t } = useTranslation('app');

  const verifyOTP = React.useCallback(
    async (code: string) => {
      try {
        const { data } = await post(
          'customer/verify-refund-otp',
          formDataHandler({
            contact_info: phoneNumber,
            otp: code,
          }),
        );
        if (!data.records.verify) {
          navigate('/orders/failed-order', {
            state: {
              storeAgreementUrl,
              storeName,
              message: 'unverifiedPhoneNumber',
            },
          });
        } else {
          await submitOrder();
        }
      } catch (err) {
        const error = err as any;
        const message = error?.response?.data?.errors[0]?.message;
        navigate('/orders/failed-order', {
          state: {
            storeAgreementUrl,
            storeName,
            message,
          },
        });
      }
    },
    [post, phoneNumber, navigate, storeAgreementUrl, storeName, submitOrder],
  );
  return (
    <Modal
      cardWidth={{
        xs: '90% !important',
        md: '80% !important',
        lg: '600px !important',
      }}
      open={open}
      disableEscapeKeyDown
      onClose={onClose}
    >
      <Flex
        mv="2rem"
        gap={{ xs: 7, md: 10, lg: 20 }}
        direction="column"
        align="center"
        justify="center"
      >
        <Flex direction="column" gap="16px" justify="center" align="center">
          <H3 text="phoneNumberConfirmation" />
          <OTPVerificationWrapper
            p={{ xs: 8, md: 16 }}
            gap={{ xs: 8 }}
            align="center"
            fullWidth
          >
            <Icon name="warning" size={60} color={colors.orange[700]} />

            <P1 text="phoneNumberClarification" color={pallet.text.heading} />
          </OTPVerificationWrapper>
          <P2
            text="otpSentToYou"
            color={pallet.text.heading}
            textAlign="center"
          >
            {t('otpSentToYou', {
              number: phoneNumber,
            })}
          </P2>
          <NativeVerificationInput
            name="otp"
            verificationCodeLength={4}
            onFinish={verifyOTP}
            hasError={false}
          />
        </Flex>
      </Flex>
    </Modal>
  );
}
