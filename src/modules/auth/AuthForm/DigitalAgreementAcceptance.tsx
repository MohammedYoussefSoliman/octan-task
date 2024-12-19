import React from 'react';

import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  Divider,
  HTML,
  Spinner,
  Checkbox,
  Link,
  Flex,
  Button,
  P1,
} from '@/components';
import { formDataHandler } from '@/helpers/functions';
import urls, { externalLinks } from '@/helpers/urls';
import {
  useAppSelector,
  useAxiosInstance,
  useAppDispatch,
  useGetQuerySearch,
} from '@/hooks';
import profileService from '@/state/auth/profileService';
import registerService from '@/state/auth/registerService';
import { setRememberMe } from '@/state/auth/slice';
import { showError } from '@/state/ui-actions/slice';

import AuthPaper from './AuthPaper';
import { AgreementWrapper } from './styles';
import { FormDataType } from './types';

type Props = {
  onRegisterFailed?: () => void;
};

export default function DigitalAgreementAcceptance({
  onRegisterFailed,
}: Props) {
  const { createOrder } = useGetQuerySearch();
  const { getService: getUserProfile } = profileService;
  const navigate = useNavigate();
  const { getValues, control } = useFormContext<FormDataType>();
  const { pallet } = useTheme();
  const { get } = useAxiosInstance();
  const {
    consumerAuth: { fireBaseToken },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [isDisabled, setIsDisabled] = React.useState<boolean>(true);
  const [agreement, setAgreement] = React.useState<null | string>(null);
  const { dialCode, phoneNumber, otp, rememberMe } = getValues();
  const getTerms = React.useCallback(async () => {
    try {
      const { data } = await get('agreement');
      setAgreement(data.records[0].agreement);
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, get]);
  const registerUser = React.useCallback(async () => {
    setSubmitting(true);
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
      ...formDataObj,
    });
    dispatch(setRememberMe(rememberMe));
    dispatch(
      registerService({
        formData,
        onSuccess: async () => {
          getTerms()
            .then(() => dispatch(getUserProfile({})))
            .then(() => setSubmitting(false))
            .then(() =>
              navigate(
                `${urls.loginSuccess}${createOrder ? '?createOrder=true' : ''}`,
                { state: { type: 'login' } },
              ),
            );
          // .then(() => onRegisterSuccess());
        },
        onFailure() {
          if (onRegisterFailed) {
            onRegisterFailed();
          }
        },
      }),
    );
  }, [
    fireBaseToken,
    dialCode,
    phoneNumber,
    otp,
    dispatch,
    rememberMe,
    getTerms,
    getUserProfile,
    navigate,
    createOrder,
    onRegisterFailed,
  ]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!e.target.checked);
  };

  React.useEffect(() => {
    getTerms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <Flex align="center" justify="center" p={50} fullWidth>
        <Spinner size={50} />
      </Flex>
    );
  return (
    <AuthPaper>
      <AgreementWrapper
        gap={{ xs: 16, md: 30, lg: 40 }}
        direction="column"
        justify="space-between"
        align="center"
        fullWidth
      >
        <Flex
          gap={{ xs: 16, md: 28 }}
          direction="column"
          justify="center"
          align="center"
          fullWidth
        >
          <div className="agreement--content">
            {agreement && <HTML content={agreement} />}
          </div>
          <Divider />
          <Flex
            fullWidth
            justify="center"
            align="flex-start"
            direction="column"
          >
            <Flex gap="6px" align="center">
              <Checkbox
                control={control}
                name="userAgreement"
                changeHandler={onChange}
                fillColor={pallet.text.success}
              />
              <P1 text="iAgree" />
              <Link relative={false} to={externalLinks.termsAndConditions}>
                <P1
                  hover={{
                    decoration: 'underline',
                  }}
                  color={pallet.text.heading}
                  weight={500}
                  text="termsAndConditions"
                />
              </Link>
              <P1 color={pallet.text.heading} text="and" />
              <Link relative={false} to={externalLinks.privacy}>
                <P1
                  hover={{
                    decoration: 'underline',
                  }}
                  color={pallet.text.heading}
                  weight={500}
                  text="privacyPolicy"
                />
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Button
          onClick={registerUser}
          type="button"
          isLoading={submitting}
          disabled={isDisabled}
          className="agreement--button"
        >
          accept
        </Button>
      </AgreementWrapper>
    </AuthPaper>
  );
}
