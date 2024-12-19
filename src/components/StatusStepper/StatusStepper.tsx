import React from 'react';

import { RefundStatus } from '@/helpers/types';

import StatusStep from './StatusStep';
import { StepperSeparator, Wrapper } from './styles';
import resolveStatus from './utils/resolveStatus';

type Props = {
  orderStatuses: RefundStatus[];
};

export default function StatusStepper({ orderStatuses }: Props) {
  if (!orderStatuses.length) return null;

  return (
    <Wrapper
      gap={{ xs: 7, md: 15 }}
      align="center"
      justify="space-between"
      width={{ xs: '100%', lg: '90%' }}
      direction={{ xs: 'column', md: 'row' }}
      withWrap
    >
      {orderStatuses.map((status, index) => {
        const statusVariant = resolveStatus(
          status.variant,
          status.name,
          status.icon,
          status.statusText,
          status.state,
        );

        return (
          <React.Fragment key={status.icon}>
            <StatusStep isCurrent={status.isCurrent} {...statusVariant} />
            {index < orderStatuses.length - 1 && (
              <StepperSeparator
                className="separator--status"
                orderState={
                  statusVariant.state === 'failure'
                    ? 'failure'
                    : statusVariant.state === 'success'
                      ? 'success'
                      : status.isCurrent
                        ? 'current'
                        : statusVariant.state
                }
              />
            )}
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
}
