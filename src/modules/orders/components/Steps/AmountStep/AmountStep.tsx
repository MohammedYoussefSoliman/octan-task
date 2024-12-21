import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import images from '@/assets/images';
import {
  Card,
  Button,
  Flex,
  Checkbox,
  Link,
  FullscreenModal,
  P2,
  useStepperApi,
} from '@/components';
import { scrollToTop } from '@/helpers/functions';
import modalKeys from '@/helpers/modalKeys';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import AuthStatus from '@/modules/auth/AuthForm/FinalStep';
import { getAddresses } from '@/state/order/addressesServices';
import { getBankAccounts } from '@/state/order/getBankAccounts';
import { setFormItems } from '@/state/order/slice';
import { closeModal, updateOrderCheckAuth } from '@/state/ui-actions/slice';

import StepAction from '../../StepAction';
import StepHeader from '../../StepHeader';
import Table from '../Table';

export default function AmountStep() {
  const navigate = useNavigate();
  const { t } = useTranslation('app');
  const { pallet, branding } = useTheme();
  const dispatch = useAppDispatch();
  const { loggedIn } = useAuth();
  const { getValues, setValue, control } = useFormContext();

  const { nafathVerificationStatus, requireNafathStep } = useAppSelector(
    (state) => state.consumerAuth,
  );
  const { order, refundReasons } = useAppSelector(
    (state) => state.consumerOrder,
  );
  const isCancellation = lodashGet(order, 'is_cancellation');

  const { modals, orderCheckAuth } = useAppSelector((state) => state.uiActions);

  const [loadingBankAddressInfo, setLoadingBankAddressInfo] =
    React.useState<boolean>(false);

  const { handleNext } = useStepperApi();

  React.useEffect(() => {
    if (isCancellation && order?.items) {
      order.items.forEach((item, index) => {
        setValue(`items[${index}].checked`, true);
        setValue(`items[${index}].quantity`, item.quantity);
        setValue(`items[${index}].reason_id`, refundReasons[0].id);
        if (item.variant_id) {
          setValue(`items[${index}].variant_id`, item.variant_id);
        }
      });
    }
  }, [isCancellation, order?.items, refundReasons, setValue]);

  React.useEffect(() => {
    scrollToTop(200);
  }, [loggedIn]);

  const onLogin = React.useCallback(async () => {
    const { items } = getValues();
    await dispatch(setFormItems({ items }));
    if (loggedIn && nafathVerificationStatus !== 'verified') {
      navigate('/verify-nafath?createOrder=true');
    } else {
      navigate('/login?createOrder=true');
    }
  }, [dispatch, getValues, loggedIn, nafathVerificationStatus, navigate]);

  if (!order) return null;

  return (
    <>
      <Card heading="refundedItems">
        <Flex
          direction="column"
          align="center"
          gap={{ xs: 30, lg: 40 }}
          fullWidth
        >
          {order.store && (
            <StepHeader
              logo={order.store.logo}
              name={order.store.name}
              orderId={order.order_number}
            />
          )}
          <Table order={order} refundReasons={refundReasons} />
          {!loggedIn ||
          (nafathVerificationStatus !== 'verified' && requireNafathStep) ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap={{ xs: 6, md: 12, lg: 24 }}
              fullWidth
            >
              <Button onClick={onLogin} color={branding.primaryColor}>
                loginToYamm
              </Button>
            </Flex>
          ) : (
            <>
              <Flex
                direction={{ xs: 'column', md: 'row' }}
                gap={{ xs: 6 }}
                justify="flex-start"
                align={{ xs: 'flex-start', md: 'center' }}
                fullWidth
              >
                <Checkbox
                  control={control}
                  name="acceptPolicy"
                  label="acceptOn"
                  fillColor={branding.primaryColor ?? pallet.primary[600]}
                />
                <Link to={order.store.agreement_url} relative={false}>
                  <Trans
                    i18nKey="refundAndReturnPolicyAcceptance"
                    t={t}
                    values={{ storeName: order.store.name }}
                    components={{
                      storePolicy: (
                        <P2
                          color={branding.primaryColor ?? pallet.primary[600]}
                          weight={500}
                          hover={{ decoration: 'underline' }}
                        >
                          placeholder
                        </P2>
                      ),
                    }}
                  />
                </Link>
              </Flex>
              <StepAction
                onClick={async () => {
                  await dispatch(
                    getAddresses({
                      onSuccess() {
                        dispatch(getBankAccounts({}));
                      },
                      setLoading: setLoadingBankAddressInfo,
                    }),
                  );
                  handleNext();
                }}
                watchedKey="acceptPolicy"
                isLoading={loadingBankAddressInfo}
              />
            </>
          )}
        </Flex>
      </Card>
      {orderCheckAuth !== 'natural' && (
        <FullscreenModal
          backgroundImage={images.SCREEN_BG}
          open={modals?.includes(modalKeys.checkOrderAuthStatus)}
          onClose={() => {
            dispatch(
              getAddresses({
                onSuccess() {
                  dispatch(
                    getBankAccounts({
                      onSuccess() {
                        dispatch(closeModal(modalKeys.checkOrderAuthStatus));
                        dispatch(updateOrderCheckAuth('natural'));
                      },
                    }),
                  );
                },
                setLoading: setLoadingBankAddressInfo,
              }),
            );
          }}
        >
          <AuthStatus authSuccess={orderCheckAuth === 'success'} />
        </FullscreenModal>
      )}
    </>
  );
}
