/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';

import { useTheme } from '@emotion/react';
import loGet from 'lodash/get';
import { useFormContext } from 'react-hook-form';

import {
  Button,
  Card,
  Figure,
  Form,
  Flex,
  H6,
  P1,
  P2,
  P3,
  TextArea,
} from '@/components';
import StyledBadge from '@/components/Badge/styles';
import { useStepperApi } from '@/components/Stepper';
import { scrollToTop } from '@/helpers/functions';
import { useAppSelector, useBreakpoints } from '@/hooks';
import { useSelectedItems } from '@/modules/orders/hooks';

import StepHeader from '../../StepHeader';
import { AllAttachmentsWrapper, AttachmentsWrapper } from '../../styles';

export default function AmountStep() {
  const {
    pallet,
    colors,
    branding: { primaryColor },
  } = useTheme();

  const { medium } = useBreakpoints();
  const { handleCompleted, handleNext, activeStep } = useStepperApi();
  const { setValue: setUpperFormValue } = useFormContext();
  const {
    consumerOrder: { order, refundReasons },
  } = useAppSelector((state) => state);
  const { selectedItems } = useSelectedItems();

  const readyItems = selectedItems
    .filter((item: any) => item.checked)
    .filter((item: any) => item.reason_id !== undefined)
    .map((item: any) => {
      const itemReason = refundReasons.find(
        (reason) => reason.id === item.reason_id,
      )!;
      return {
        ...item,
        reasonText: itemReason.name,
        rules: itemReason.rules,
        itemDetails: order?.items.find((orderItem) => item.id === orderItem.id),
      };
    });

  React.useEffect(() => {
    scrollToTop(200);
  }, []);

  if (!order) return null;

  return (
    <Card heading="reasonsAttachments">
      <AllAttachmentsWrapper
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
        <Form defaultValues={{ items: readyItems }} className="form">
          {({
            control,
            handleSubmit,
            formState: { errors },
            trigger,
            setValue,
          }) => {
            return (
              <Flex direction="column" gap={{ xs: 16 }} fullWidth>
                {readyItems.map((readyItem: any, itemIndex: number) => (
                  <AttachmentsWrapper
                    direction="column"
                    key={`${readyItem.id}${readyItem.reasonText}`}
                    gap={{ xs: 16 }}
                  >
                    <Flex
                      pb={{ xs: 16, md: 30 }}
                      className="item--info"
                      justify="space-between"
                      fullWidth
                      gap={{ xs: 8 }}
                    >
                      <Flex gap={{ xs: 8, sm: 16 }} align="center">
                        <Figure
                          url={loGet(readyItem, 'image.url', null)}
                          alt={loGet(readyItem, 'name', '')}
                        />
                        <Flex gap={{ xs: 8 }} direction="column">
                          <Flex align="center" gap={{ xs: 14 }}>
                            <H6
                              text={loGet(readyItem, 'name', '')}
                              color={primaryColor}
                            />
                            <StyledBadge status="pending">
                              <Flex align="center" gap={{ xs: 10 }}>
                                <P1
                                  color={colors.grey[500]}
                                  text="quantity"
                                  endAdornment=":"
                                />
                                <P1
                                  color={colors.grey[500]}
                                  text={`${readyItem.quantity}`}
                                />
                              </Flex>
                            </StyledBadge>
                          </Flex>
                          <P2
                            text={`${loGet(
                              readyItem,
                              'itemDetails.final_price',
                              '',
                            )}  ${order?.currency}`}
                            endAdornment=""
                            color={colors.grey[400]}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                    <H6 text="returnReason" />
                    <Flex p={{ xs: 8 }} className="reason--wrapper">
                      <P1
                        text={`${readyItem.reasonText}`}
                        color={pallet.text.heading}
                      />
                    </Flex>
                  </AttachmentsWrapper>
                ))}
                <Flex
                  width={{ xs: '100%', md: 'auto' }}
                  direction="column"
                  gap={{ xs: 6 }}
                >
                  <P3
                    text="requiredTextPlaceholder"
                    color={pallet.text.heading}
                  />
                  <TextArea
                    name="_cancellationReason"
                    control={control}
                    changeHandler={(e) => {
                      readyItems.forEach((_: any, index: number) => {
                        setValue(
                          `items[${index}].requiredText`,
                          e.target.value,
                        );
                      });
                    }}
                    required
                  />
                </Flex>
                <Flex
                  ms="auto"
                  fullWidth={!medium}
                  width={{
                    xs: '100%',
                    md: '50%',
                    lg: '400px',
                  }}
                  mt={{ xs: 16, md: 32, lg: 40 }}
                >
                  <Button
                    type="button"
                    onClick={async () => {
                      const results = await trigger();
                      if (errors.items) {
                        scrollToTop(300);
                      }
                      if (results) {
                        handleSubmit((data) => {
                          const { items } = data;
                          scrollToTop(400);
                          const updatedRefundItems = selectedItems.map(
                            (reItem: any) => {
                              const updatedItem = items.find(
                                (it: any) => it.id === reItem.id,
                              );

                              delete updatedItem?.checked;
                              delete updatedItem?.reason_id;
                              delete updatedItem?.variant_id;
                              delete updatedItem?.id;
                              delete updatedItem?.quantity;

                              return {
                                ...reItem,
                                ...updatedItem,
                              };
                            },
                          );
                          setUpperFormValue('items', updatedRefundItems);
                          handleCompleted(activeStep);
                          handleNext();
                        })();
                      }
                    }}
                    fullWidth
                    color={primaryColor}
                  >
                    next
                  </Button>
                </Flex>
              </Flex>
            );
          }}
        </Form>
      </AllAttachmentsWrapper>
    </Card>
  );
}
