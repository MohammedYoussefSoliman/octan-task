import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import {
  LocalizedNumberInput,
  Flex,
  Button,
  SocialBar,
  H3,
  P3,
  P2,
} from '@/components';
import {
  formDataHandler,
  convertArabicDigitsToEnglish,
} from '@/helpers/functions';
import { useAppSelector, useAppDispatch, useAxiosInstance } from '@/hooks';
import registerService from '@/state/auth/registerService';
import { setRememberMe, setUpdateNationalId } from '@/state/auth/slice';

import FaqAccordion from '../../faqs/FaqAccordion';

import AuthPaper from './AuthPaper';
import { NafathGuildWrapper } from './styles';
import { FormDataType } from './types';

type Props = {
  onRegisterFailed?: () => void;
  handleNext: () => void;
};

export default function RegisterStep({ onRegisterFailed, handleNext }: Props) {
  const { colors } = useTheme();
  const {
    consumerAuth: { fireBaseToken, updateNationalId },
  } = useAppSelector((state) => state);
  const { getValues, control } = useFormContext<FormDataType>();
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const { post } = useAxiosInstance();

  const onConfirm = React.useCallback(async () => {
    const { nationalId, dialCode, phoneNumber, otp, rememberMe } = getValues();
    let formDataObj = {};
    if (fireBaseToken && fireBaseToken !== 'refused') {
      formDataObj = {
        'device_token[token]': fireBaseToken,
        'device_token[type]': 'web-consumer',
      };
    }
    const formData = formDataHandler({
      phone_number: `${dialCode}${phoneNumber}`,
      otp,
      national_id: convertArabicDigitsToEnglish(nationalId),
      ...formDataObj,
    });
    setSubmitting(true);
    dispatch(setRememberMe(rememberMe));
    dispatch(
      registerService({
        formData,
        onSuccess() {
          handleNext();
        },
        onFailure() {
          if (onRegisterFailed) {
            setSubmitting(false);
            onRegisterFailed();
          }
        },
      }),
    );
  }, [dispatch, fireBaseToken, getValues, handleNext, onRegisterFailed]);

  const onUpdateNationalId = React.useCallback(async () => {
    const { nationalId } = getValues();
    setSubmitting(true);
    try {
      await post(
        'customer/update-national-id',
        formDataHandler({ national_id: nationalId }),
      );
      dispatch(setUpdateNationalId(false));
      handleNext();
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, getValues, handleNext, post]);

  return (
    <AuthPaper>
      <Flex
        gap={{ xs: 10, md: 20, lg: 40 }}
        direction="column"
        justify="center"
        align="center"
        maxWidth="500px"
      >
        <Flex direction="column" align="center">
          <H3 text="personalInfo" capitalizeFirstLetter />
          <H3 text="nafathConfirmationNeeded" />
        </Flex>
        <Flex direction="column">
          <FaqAccordion
            question="whyNafathQuestion"
            answer="whyNafathAnswer"
            isTranslated={false}
          />
          <NafathGuildWrapper
            direction={{ xs: 'column' }}
            gap={{ xs: '16px' }}
            p={{ xs: 10, md: 16, xxl: 24 }}
          >
            <P2 text="requireNafath" color={colors.orange[800]} />
          </NafathGuildWrapper>
        </Flex>

        <Flex
          direction="column"
          fullWidth
          gap={{
            xs: 10,
            md: 20,
          }}
        >
          <Flex direction="column" fullWidth>
            <LocalizedNumberInput
              name="nationalId"
              label="nationalId"
              required="nationalIdRequired"
              control={control}
              maxLength={10}
              validationRules={{
                minLength: { value: 10, message: 'nationalIdMinLength' },
              }}
            />
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            gap={10}
            ph={10}
            fullWidth
          >
            <P3>needHelp</P3>
            <SocialBar
              filter={['email', 'instagram', 'twitter']}
              spaceBetweenSize="dense"
              size="sm"
            />
          </Flex>
          <Button
            onClick={updateNationalId ? onUpdateNationalId : onConfirm}
            isLoading={submitting}
            fullWidth
          >
            registerSubmit
          </Button>
        </Flex>
      </Flex>
    </AuthPaper>
  );
}
