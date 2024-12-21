import React from 'react';

import { useTheme } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import lodashGet from 'lodash/get';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { Form, Container, Flex, PoweredByYamm } from '@/components';
import Stepper from '@/components/Stepper';
import urls from '@/helpers/urls';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeHeaderVariant } from '@/state/ui/slice';

import AddressesStep from './components/Steps/AddressesStep';
import AmountStep from './components/Steps/AmountStep/AmountStep';
import DetailsStep from './components/Steps/DetailsStep';
import ItemsStep from './components/Steps/ItemsStep';
import PaymentStep from './components/Steps/PaymentStep';
import ReasonsAttachmentsStep from './components/Steps/ReasonsAttachmentsStep';
import ShippingStep from './components/Steps/ShippingStep';
import Wrapper, { BrandingWrapper } from './styles';

export default function CheckOrder() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { order, checkOrderFormItems, checkOrderStep } = useAppSelector(
    (state) => state.consumerOrder,
  );

  const {
    branding: { isEnabled: isBranded, primaryColor },
  } = useTheme();

  const rememberMe = useAppSelector((state) => state.consumerAuth.rememberMe);

  const schema = yup.object().shape({
    items: yup.array().of(
      yup.object().shape({
        checked: yup.boolean(),
        reason_id: yup.string().when('checked', {
          is: true,
          then: yup.string().required('requiredReason'),
        }),
        quantity: yup.number(),
      }),
    ),
  });

  React.useEffect(() => {
    // adjust the header for this module
    dispatch(changeHeaderVariant('white'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeJourney = lodashGet(order, 'store.store_journey');
  const isCancellation = lodashGet(order, 'is_cancellation');

  const steps = isCancellation
    ? [
        {
          children: <AmountStep />,
        },
        {
          children: <ReasonsAttachmentsStep />,
        },
        {
          children: <PaymentStep />,
        },
        {
          children: <DetailsStep />,
        },
      ]
    : storeJourney === 'shipless'
      ? [
          {
            children: <ItemsStep />,
          },
          {
            children: <AmountStep />,
          },
          {
            children: <ReasonsAttachmentsStep />,
          },
          {
            children: <PaymentStep />,
          },
          {
            children: <DetailsStep />,
          },
        ]
      : [
          {
            children: <ItemsStep />,
          },
          {
            children: <AmountStep />,
          },
          {
            children: <ReasonsAttachmentsStep />,
          },
          {
            children: <AddressesStep />,
          },
          {
            children: <ShippingStep />,
          },
          {
            children: <PaymentStep />,
          },
          {
            children: <DetailsStep />,
          },
        ];

  React.useEffect(() => {
    if (!order) {
      navigate(urls.home);
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  const BrandingWrapperElement = isBranded ? BrandingWrapper : React.Fragment;

  return (
    <BrandingWrapperElement>
      <Container width="extraWide">
        <Wrapper direction="column" gap={{ xs: 12, md: 25, lg: 50 }} fullWidth>
          <Form
            defaultValues={{
              items: checkOrderFormItems.length
                ? checkOrderFormItems
                : order.items.map((i) => ({
                    id: i.id,
                    quantity: i.quantity,
                    checked: false,
                  })),
              rememberMe,
              refundMethod: 'bankTransfer',
            }}
            resolver={yupResolver(schema)}
          >
            <Flex
              gap={{ xs: 8, md: 16, lg: 32 }}
              direction="column"
              mv={24}
              fullWidth
            >
              <Stepper steps={steps} readOnly currentStep={checkOrderStep} />
            </Flex>
            <Flex justify="center" fullWidth pv={10}>
              {isBranded && <PoweredByYamm color={primaryColor} />}
            </Flex>
          </Form>
        </Wrapper>
      </Container>
    </BrandingWrapperElement>
  );
}
