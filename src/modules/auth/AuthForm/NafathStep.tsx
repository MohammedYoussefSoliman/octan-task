import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  LinkButton,
  SidedTemplate,
  SocialBar,
  Button,
  CountDown,
  Spinner,
} from '@/components';
import { H1, H3, P1, P3 } from '@/components/Typography';
import { formDataHandler } from '@/helpers/functions';
import urls from '@/helpers/urls';
import {
  useAppDispatch,
  useAuth,
  useAxiosInstance,
  useEventSource,
  useGetQuerySearch,
} from '@/hooks';
import { setUpdateNationalId } from '@/state/auth/slice';
import { showError } from '@/state/ui-actions/slice';

import { InlineWrapper, NafathGuildWrapper } from './styles';

type Props = {
  handleNext: (value?: number) => void;
};

type NafathVerificationResponse = {
  random: string;
  expirationDate: string;
  channel: string;
  event: string;
};

export default function NafathStep({ handleNext }: Props) {
  const { colors } = useTheme();
  const { createOrder } = useGetQuerySearch();
  const navigate = useNavigate();

  const { data: sseData, doSSe } = useEventSource();
  const { getValues } = useFormContext();
  const nationalId = getValues('nationalId') as string;

  const nationalIdAliasStart = nationalId.substring(0, 2);
  const nationalIdAliasEnd = nationalId.substring(8);

  const { t } = useTranslation('app');
  const dispatch = useAppDispatch();
  const { get, post } = useAxiosInstance();
  const [countDowntime, setCountDownTime] = React.useState<number>(30);
  const [verifyButtonCountdown, setVerifyButtonCountdown] =
    React.useState<number>(20);
  const { logout } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingVerification, setLoadingVerification] =
    React.useState<boolean>(false);

  const [nafathVerificationData, setNafathVerificationData] =
    React.useState<NafathVerificationResponse | null>(null);

  const goBack = React.useCallback(() => {
    dispatch(setUpdateNationalId(true));
    handleNext(0);
  }, [dispatch, handleNext]);

  const checkNafathVerified = React.useCallback(async () => {
    const { data: resData } = await get('customer/verifyNafath');
    if (lodashGet(resData, 'records.status') === 'COMPLETED') {
      navigate(
        `${urls.loginSuccess}${createOrder ? '?createOrder=true' : ''}`,
        { state: { nafathVerified: true } },
      );
    }
  }, [createOrder, get, navigate]);

  const requestNafathVerification = React.useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { records },
      } = await get('customer/sendOTPNafath');
      if (records) {
        setNafathVerificationData({
          random: records.random,
          expirationDate: records.expired_at,
          channel: records.channel,
          event: records.event,
        });
      }
      setLoading(false);
      doSSe();
    } catch (err) {
      const error = err as any;
      const message = error?.response?.data?.errors[0]?.message;
      if (
        error?.response?.data?.errors[0]?.key === 'nafath_already_activated'
      ) {
        navigate(
          `${urls.loginSuccess}${createOrder ? '?createOrder=true' : ''}`,
          { state: { nafathVerified: true } },
        );
      } else {
        dispatch(showError(message));
      }
    }
  }, [createOrder, dispatch, doSSe, get, navigate]);

  const [showResentButton, setShowResendButton] =
    React.useState<boolean>(false);

  const onUpdateNationalId = React.useCallback(async () => {
    setLoading(true);
    try {
      await post(
        'customer/update-national-id',
        formDataHandler({ national_id: nationalId }),
      );
      dispatch(setUpdateNationalId(false));
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, nationalId, post]);

  const nafathInit = React.useCallback(async () => {
    onUpdateNationalId().then(() => {
      if (!nafathVerificationData) {
        requestNafathVerification();
      }
    });
  }, [nafathVerificationData, onUpdateNationalId, requestNafathVerification]);

  React.useEffect(() => {
    nafathInit();
    return () => {
      doSSe().close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lodashGet(sseData, 'status') === 'COMPLETED') {
      navigate(
        `${urls.loginSuccess}${createOrder ? '?createOrder=true' : ''}`,
        { state: { nafathVerified: true } },
      );
    }
    return () => {
      doSSe().close();
    };
  }, [dispatch, sseData, doSSe, createOrder, navigate]);

  // React.useEffect(() => {
  //   const intervalFn = setInterval(async () => {
  //     if (verifyButtonCountdown > 0) {
  //       setVerifyButtonCountdown(verifyButtonCountdown - 5);
  //     }
  //     await checkNafathVerified();
  //   }, 5000);
  //   return () => clearInterval(intervalFn);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkNafathVerified]);

  return (
    <SidedTemplate>
      <Flex
        direction={{ xs: 'column' }}
        gap={{ xs: '20px' }}
        fullWidth
        fullHeight
      >
        <Flex
          justify="center"
          align="center"
          mt="2rem"
          direction={{ xs: 'column' }}
          gap={{ xs: '32px' }}
          fullWidth
        >
          <H3 text="nafathConfirmationNeeded" />
          {/* <NafathGuildWrapper
            direction={{ xs: "column" }}
            gap={{ xs: "16px" }}
            p={{ xs: 10, md: 16, xxl: 24 }}
          >
            <P1 text="openNafathApplication" color={colors.orange[800]} />
            <P1
              text="enterTheBelowCodeToNafathAuthenticator"
              color={colors.orange[800]}
            />
          </NafathGuildWrapper> */}
          <Flex
            direction="column"
            gap={{
              xs: 10,
              md: 16,
            }}
            align="center"
          >
            <NafathGuildWrapper
              direction={{ xs: 'column' }}
              gap={{ xs: '16px' }}
              p={{ xs: 10, md: 16, xxl: 24 }}
            >
              <InlineWrapper>
                <P1 color={colors.orange[800]}>
                  {t('requireNafathGuild', {
                    nationalIdStart: nationalIdAliasStart,
                    nationalIdEnd: nationalIdAliasEnd,
                  })}
                </P1>
                <LinkButton onClick={goBack}>
                  <P1
                    text="clickHere"
                    hover={{ decoration: 'underline' }}
                    weight={500}
                    color={colors.green[500]}
                  />
                </LinkButton>
              </InlineWrapper>
            </NafathGuildWrapper>
            <P1 color={colors.red[800]}>{t('nafathVerificationMayDelay')}</P1>
          </Flex>

          {/* <InlineWrapper>
            <P1 text="ifNafathVerified" capitalizeFirstLetter />
            <LinkButton
              disabled={loadingVerification}
              onClick={checkNafathVerified}
            >
              {loadingVerification ? (
                <Flex gap={{ xs: 4 }} align={{ xs: "center" }}>
                  <Spinner />
                  <P1
                    text="waiting"
                    hover={{ decoration: "underline" }}
                    weight={500}
                    color={pallet.primary[500]}
                    capitalizeFirstLetter
                  />
                </Flex>
              ) : (
                <P1
                  text="navigateNafathSuccess"
                  hover={{ decoration: "underline" }}
                  weight={500}
                  color={pallet.primary[500]}
                />
              )}
            </LinkButton>
          </InlineWrapper> */}
          <Flex
            justify="space-between"
            align="center"
            direction={{ xs: 'column' }}
            gap={{ xs: 16, xxl: 32 }}
            fullWidth
          >
            {loading ? (
              <Spinner />
            ) : (
              <H1 text={nafathVerificationData?.random} />
            )}
            <Flex
              direction={{ xs: 'column' }}
              align="center"
              gap={{ xs: 8, md: 16 }}
            >
              {verifyButtonCountdown === 0 && (
                <Button
                  size="lg"
                  isLoading={loadingVerification}
                  onClick={async () => {
                    setLoadingVerification(true);
                    await checkNafathVerified();
                    setLoadingVerification(false);
                    setVerifyButtonCountdown(20);
                  }}
                  color={colors.orange[700]}
                >
                  verifyNafathManually
                </Button>
              )}
              {countDowntime > 0 && (
                <CountDown
                  time={countDowntime}
                  onFinish={() => {
                    setCountDownTime(0);
                  }}
                  withProgress
                  reset={showResentButton}
                />
              )}

              {countDowntime === 0 && (
                <Button
                  size="lg"
                  onClick={() => {
                    requestNafathVerification();
                    setShowResendButton(false);
                    setCountDownTime(30);
                  }}
                >
                  resendNafathVerification
                </Button>
              )}
              <Flex mt="1rem">
                <InlineWrapper>
                  <P1>gotStuck</P1>
                  <LinkButton onClick={logout}>
                    <P1
                      text="clickHere"
                      hover={{ decoration: 'underline' }}
                      weight={500}
                      color={colors.red[600]}
                    />
                  </LinkButton>
                </InlineWrapper>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          mt="2rem"
          direction="column"
          align="center"
          gap={10}
          ph={10}
          fullWidth
        >
          <P3>needHelp</P3>
          <SocialBar
            filter={['email', 'twitter']}
            spaceBetweenSize="dense"
            size="sm"
          />
        </Flex>
      </Flex>
    </SidedTemplate>
  );
}
