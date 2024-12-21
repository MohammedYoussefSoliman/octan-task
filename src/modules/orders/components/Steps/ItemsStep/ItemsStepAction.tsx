import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button, Flex } from '@/components';
import { useStepperApi } from '@/components/Stepper';
import { formDataHandler } from '@/helpers/functions';
import {
  useAppDispatch,
  useAppSelector,
  useAxiosInstance,
  useBreakpoints,
} from '@/hooks';
import { useSelectedItems } from '@/modules/orders/hooks';
import {
  setRequireNafathAuthentication,
  setRequireNafathStep,
} from '@/state/auth/slice';
import { showError } from '@/state/ui-actions/slice';

const prepareItemsObject = (items: any[]) => {
  let obj = {};

  items.forEach((item, index) => {
    obj = {
      ...obj,
      [`items[${index}][product_id]`]: item.product_id,
      [`items[${index}][reason_id]`]: item.reason_id,
      [`items[${index}][quantity]`]: item.quantity,
    };
  });
  return obj;
};

export default function StepAction() {
  const dispatch = useAppDispatch();
  const { post } = useAxiosInstance();
  const order = useAppSelector((state) => state.consumerOrder.order);
  const nafathVerificationStatus = useAppSelector(
    (state) => state.consumerAuth.nafathVerificationStatus,
  );

  const {
    branding: { primaryColor },
  } = useTheme();

  const { handleCompleted, handleNext, activeStep } = useStepperApi();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { selectedItems } = useSelectedItems();

  const checkRequiredNafath = React.useCallback(async () => {
    if (!order) return;
    setLoading(true);
    try {
      const response = await post(
        'customer/is-nafath-required',
        formDataHandler({
          store_id: order.store.id,
          order_number: order.order_number,
          ...prepareItemsObject(selectedItems),
        }),
      );
      // Verification of Nafath requires check of the customer data and the shouldVerifyNafath
      const shouldVerifyNafathRes = loGet(
        response.data,
        'records.shouldVerifyNafath',
        false,
      );
      const isCustomerVerified = loGet(
        response.data,
        'customer.nafath_verified_at',
      );

      const shouldVerifyNafath = shouldVerifyNafathRes && !isCustomerVerified;

      setLoading(false);
      if (!shouldVerifyNafath) {
        dispatch(setRequireNafathAuthentication('verified'));
      } else if (
        shouldVerifyNafath &&
        nafathVerificationStatus !== 'verified'
      ) {
        dispatch(setRequireNafathAuthentication('initial'));
      }
      dispatch(setRequireNafathStep(shouldVerifyNafath));
    } catch (error) {
      if ((error as any).response.data) {
        dispatch(showError((error as any).response?.data?.errors[0]?.message));
      }
    }
  }, [dispatch, nafathVerificationStatus, order, post, selectedItems]);
  const { medium } = useBreakpoints();

  const {
    trigger,
    formState: { errors },
  } = useFormContext();
  const items = useWatch({ name: 'items' });

  const { items: itemsErrors } = errors;
  React.useEffect(() => {
    if (itemsErrors) {
      const errorElement = document.getElementsByClassName('input-error');

      if (errorElement && errorElement[0]?.parentElement) {
        errorElement[0].parentElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [errors, itemsErrors]);

  return (
    <Flex
      ms="auto"
      width={{
        xs: '100%',
        md: '50%',
        lg: '400px',
      }}
      m="32px 0"
      fullWidth={!medium}
    >
      <Button
        onClick={async () => {
          const result = await trigger('items', {
            shouldFocus: true,
          });
          if (itemsErrors) {
            const errorElement = document.getElementsByClassName('input-error');

            if (errorElement && errorElement[0]?.parentElement) {
              errorElement[0].parentElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }
          }
          if (result) {
            checkRequiredNafath()
              .then(() => handleCompleted(activeStep))
              .then(() => handleNext());
          }
        }}
        isLoading={loading}
        type="button"
        disabled={!items?.some((it: any) => it.checked === true)}
        fullWidth
        color={primaryColor}
      >
        next
      </Button>
    </Flex>
  );
}
