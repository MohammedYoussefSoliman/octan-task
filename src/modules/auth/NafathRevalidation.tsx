import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { useTranslation } from 'react-i18next';

import {
  Spinner,
  SocialBar,
  SidedTemplate,
  FullscreenModal,
  LinkButton,
  Flex,
  CountDown,
  Button,
} from '@/components';
import { H1, H3, P1, P3 } from '@/components/Typography';
import modalKeys from '@/helpers/modalKeys';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosInstance,
  useEventSource,
  useAuth,
} from '@/hooks';
import { setRequireNafathAuthentication } from '@/state/auth/slice';
import { closeModal, openModal, showSuccess } from '@/state/ui-actions/slice';

import { NafathGuildWrapper, InlineWrapper } from './AuthForm/styles';
import NationalForm from './NationalForm';

type NafathVerificationResponse = {
  random: string;
  expirationDate: string;
  channel: string;
  event: string;
};

export default function NafathRevalidation() {
  const { colors } = useTheme();
  const { t } = useTranslation('app');
  const { logout } = useAuth();

  const dispatch = useAppDispatch();
  const {
    uiActions: { modals },
    consumerAuth: { nafathVerificationStatus },
  } = useAppSelector((state) => state);
  const { data: sseData, doSSe } = useEventSource();

  const { get } = useAxiosInstance();
  // const [loadingVerification, setLoadingVerification] =
  //   React.useState<boolean>(false);
  const [countDowntime, setCountDownTime] = React.useState<number>(60);
  const [nafathError, setNafathError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [nafathVerificationData, setNafathVerificationData] =
    React.useState<NafathVerificationResponse | null>(null);
  const [showNationalIdForm, setShowNationalForm] =
    React.useState<boolean>(false);
  // const checkNafathVerified = React.useCallback(async () => {
  //   setLoadingVerification(true);
  //   const { data: resData } = await get("customer/verifyNafath");
  //   if (lodashGet(resData, "records.status") === "COMPLETED") {
  //     dispatch(setRequireNafathAuthentication("verified"));
  //     dispatch(closeModal(modalKeys.nafathVerificationModal));
  //   }
  //   setLoadingVerification(false);
  // }, [get, dispatch]);

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
      setNafathError(message);
    }
  }, [doSSe, get]);

  const [showResentButton, setShowResendButton] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (nafathVerificationStatus === 'required') {
      dispatch(openModal(modalKeys.nafathVerificationModal));
      requestNafathVerification();
    }
    return () => {
      doSSe().close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (lodashGet(sseData, 'status') === 'COMPLETED') {
      dispatch(setRequireNafathAuthentication('verified'));
      dispatch(closeModal(modalKeys.nafathVerificationModal));
    }
    return () => {
      doSSe().close();
    };
  }, [dispatch, doSSe, sseData]);

  return (
    <FullscreenModal
      open={modals?.includes(modalKeys.nafathVerificationModal)}
      onClose={() => dispatch(closeModal(modalKeys.nafathVerificationModal))}
    >
      <SidedTemplate>
        <Flex
          direction={{ xs: 'column' }}
          gap={{ xs: '20px' }}
          pt={{
            xs: 40,
            md: 80,
            lg: 120,
          }}
          fullWidth
          fullHeight
        >
          <Flex
            justify="center"
            align="center"
            direction={{ xs: 'column' }}
            gap={{ xs: '32px' }}
            mt="2rem"
            fullWidth
          >
            <H3 text="nafathConfirmationNeeded" />
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
                    {t('enterTheBelowCodeToNafathAuthenticator')}
                  </P1>
                  <LinkButton onClick={() => setShowNationalForm(true)}>
                    <P1
                      text="needToUpdateNationalId"
                      hover={{ decoration: 'underline' }}
                      weight={500}
                      color={colors.green[500]}
                    />
                  </LinkButton>
                </InlineWrapper>
              </NafathGuildWrapper>
              <P1 color={colors.red[800]}>{t('nafathVerificationMayDelay')}</P1>
            </Flex>
            {showNationalIdForm && (
              <NationalForm
                callback={() => {
                  dispatch(showSuccess('nationalIdUpdatedSuccessfully'));
                  requestNafathVerification();
                  setShowNationalForm(false);
                }}
              />
            )}
          </Flex>
          <Flex
            align="center"
            direction={{ xs: 'column' }}
            gap={{ xs: '32px' }}
            fullWidth
          >
            {nafathError ? (
              <P1 text={nafathError} color={colors.red[600]} />
            ) : loading ? (
              <Spinner />
            ) : (
              <H1 text={nafathVerificationData?.random} />
            )}

            <Flex
              direction={{ xs: 'column' }}
              align="center"
              gap={{ xs: '16px' }}
            >
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
                  size="md"
                  onClick={() => {
                    requestNafathVerification();
                    setShowResendButton(false);
                    setCountDownTime(60);
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
    </FullscreenModal>
  );
}
