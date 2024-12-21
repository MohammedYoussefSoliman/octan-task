import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import {
  Form,
  Flex,
  Icon,
  TextInput,
  EmailInput,
  PhoneNumberInput,
  Button,
} from '@/components';
import { H5, P2 } from '@/components/Typography';
import {
  formDataHandler,
  convertArabicDigitsToEnglish,
} from '@/helpers/functions';
import URLS from '@/helpers/urls';
import { useAxiosInstance, useAppDispatch, useAppSelector } from '@/hooks';
import { showError, showSuccess } from '@/state';

import { JoinUsContainer } from '../style';

import HeroIcon from './HeroIcon';

type JoinUsDataType = {
  email: string;
  storeUrl: string;
  phoneNumber: string;
  dialCode: string;
};

export default function JoinUsForm() {
  const dispatch = useAppDispatch();
  const { pallet } = useTheme();
  const { language } = useAppSelector((state) => state.ui);
  const { t } = useTranslation('app');
  const { post } = useAxiosInstance();
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (data: JoinUsDataType) => {
      setSubmitting(true);
      try {
        const response = await post(
          'customer/join-us',
          formDataHandler({
            email: data.email,
            phone_number: `${data.dialCode}${convertArabicDigitsToEnglish(
              data.phoneNumber,
            )}`,
            store_url: data.storeUrl,
          }),
        );
        if (response.status === 200) {
          dispatch(showSuccess('requestSent'));
        }
      } catch (err) {
        const error = err as any;
        const message = error?.response?.data?.errors[0]?.message;
        dispatch(showError(message));
      } finally {
        setSubmitting(false);
      }
    },
    [dispatch, post],
  );

  return (
    <JoinUsContainer direction="column" align="center" gap={{ xs: 10 }}>
      <HeroIcon />
      <Flex direction="column" mv={{ xs: 10 }}>
        <H5 className="title" text="learnMore" textAlign="center" />
        <P2 className="title" text="weWillContactYou" textAlign="center" />
      </Flex>
      <Form
        defaultValues={{
          email: '',
          dialCode: '+966',
        }}
        onSubmit={onSubmit}
      >
        {({ control }) => {
          return (
            <Flex gap={{ xs: 16, lg: 24 }} direction="column" fullWidth>
              <EmailInput name="email" placeholder="email" control={control} />
              <TextInput
                name="storeUrl"
                placeholder="storeUrl"
                control={control}
              />
              <PhoneNumberInput
                name="phoneNumber"
                placeholder="phoneNumberPlaceholder"
                control={control}
                validationRules={{
                  validate: (value) =>
                    value.charAt(0) === '0'
                      ? t('startWithZeroPhoneNumber')
                      : true,
                  minLength: { value: 9, message: 'phoneMinLength' },
                  maxLength: { value: 9, message: 'phoneMaxLength' },
                }}
              />
              <Button isLoading={submitting} fullWidth>
                joinUsSubmit
              </Button>
            </Flex>
          );
        }}
      </Form>
      <Flex mt={{ xs: 29 }}>
        <Button
          size="md"
          variant="secondary"
          onClick={() => {
            window.location.href = `${URLS.business}#calculator`;
          }}
        >
          <Flex gap={{ xs: 8 }} align="center">
            <P2 text="calculateYourRevenue" color={pallet.primary[600]} />
            <Icon
              name={`arrow-${language === 'en' ? 'right' : 'left'}`}
              color={pallet.primary[600]}
            />
          </Flex>
        </Button>
      </Flex>
    </JoinUsContainer>
  );
}
