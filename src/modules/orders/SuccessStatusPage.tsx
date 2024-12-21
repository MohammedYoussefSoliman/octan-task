import React from 'react';

import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Success } from '@/assets/lotties';
import {
  Container,
  Flex,
  Button,
  Icon,
  Paper,
  H5,
  P1,
  P3,
  SocialBar,
} from '@/components';
import urls from '@/helpers/urls';
import { useAppDispatch, useAppSelector, useGetQuerySearch } from '@/hooks';
import { flushOrder, changeHeaderVariant } from '@/state';

import { WarningWrapper } from './components/styles';
import { BrandingWrapper, Strong } from './styles';

const refundOrderMassage = {
  refund_after_delivery: 'refundOrderAfterDelivery',
  refund_after_pickup: 'refundOrderAfterPickup',
};

const warningWaitingTimeMassage = {
  refund_after_delivery: 'warningWaitingTimeAfterDelivery',
  refund_after_pickup: 'warningWaitingTimeAfterPickup',
};

export default function SuccessStatusPage() {
  const params = useGetQuerySearch();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { colors, branding } = useTheme();

  const {
    consumerOrder: { order, orderDetails },
  } = useAppSelector((state) => state);

  const subscriptionType = lodashGet(
    orderDetails,
    'priceDetails.journey',
    null,
  );

  const isBNPL = ['tamara', 'tabby', 'mispay'].includes(
    order?.payment_method as string,
  );

  const isRefundAfter =
    subscriptionType === 'refund_after_delivery' ||
    subscriptionType === 'refund_after_pickup';

  React.useEffect(() => {
    dispatch(flushOrder());
    // adjust the header for this module
    dispatch(changeHeaderVariant('white'));
  }, [dispatch]);

  const { t } = useTranslation('app');

  const Wrapper = branding.isEnabled ? BrandingWrapper : React.Fragment;

  return (
    <Wrapper>
      <Container>
        <Paper mv="2rem" align="center" justify="center" fullWidth>
          <Flex
            mv="2rem"
            gap={{ xs: 7, md: 10, lg: 20 }}
            direction="column"
            align="center"
            justify="center"
            width={{ xs: '100%', md: '400px', lg: '500px' }}
          >
            <Success size={100} />
            <H5
              text="refundOrderCreatedSuccessfully"
              capitalizeFirstLetter
              textAlign="center"
            />
            {isRefundAfter || isBNPL ? (
              <>
                <P1 textAlign="center">
                  <Trans
                    i18nKey={
                      isRefundAfter
                        ? refundOrderMassage[subscriptionType]
                        : refundOrderMassage.refund_after_delivery
                    }
                    t={t}
                    values={{ id: params.id }}
                    components={{ strongId: <Strong>placeholder</Strong> }}
                  />
                </P1>
                <WarningWrapper
                  fullWidth
                  align="center"
                  justify="center"
                  direction="column"
                  gap={{ xs: 6, md: 8, lg: 16 }}
                >
                  <Icon size={32} name="info" color={colors.red[700]} />
                  <P1
                    text={
                      isRefundAfter
                        ? warningWaitingTimeMassage[subscriptionType]
                        : warningWaitingTimeMassage.refund_after_delivery
                    }
                    color={colors.red[700]}
                    weight={500}
                    textAlign="center"
                    capitalizeFirstLetter
                  />
                </WarningWrapper>
              </>
            ) : (
              <P1 textAlign="center">
                <Trans
                  i18nKey="refundOrderUnderReview"
                  t={t}
                  values={{ id: params.id }}
                  components={{ strongId: <Strong>placeholder</Strong> }}
                />
              </P1>
            )}

            <Button
              onClick={() => navigate(urls.orders)}
              size="md"
              fullWidth
              color={branding.primaryColor}
            >
              myOrders
            </Button>
            <Flex direction="column" align="center" gap={10} ph={10} fullWidth>
              <P3>needHelp</P3>
              <SocialBar
                filter={['email', 'instagram', 'twitter']}
                spaceBetweenSize="dense"
                size="sm"
              />
            </Flex>
          </Flex>
        </Paper>
      </Container>
    </Wrapper>
  );
}
