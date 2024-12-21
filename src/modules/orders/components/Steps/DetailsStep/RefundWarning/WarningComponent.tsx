import { useTheme } from '@emotion/react';
import lodashGet from 'lodash/get';
import { Trans, useTranslation } from 'react-i18next';

import { Flex, Link, P1 } from '@/components';
import { useAppSelector } from '@/hooks';

import { WarningWrapper } from '../../../styles';
import InfoTooltip from '../InfoTooltip';
import { Pricing } from '../types';

type WarningComponentProps = {
  pricing?: Pricing;
  storeName: string;
  message: string;
};

export default function WarningComponent({
  pricing,
  storeName,
  message,
}: WarningComponentProps) {
  const { colors } = useTheme();
  const { t } = useTranslation('app');
  const { order } = useAppSelector((state) => state.consumerOrder);

  if (!order) return null;

  return (
    <WarningWrapper align="center" justify="center" direction="column">
      <Flex justify="center" align="center" gap={{ xs: 6, md: 8, lg: 16 }}>
        <InfoTooltip
          color={colors.red[700]}
          total={lodashGet(pricing, 'total.value', '')}
          deduction={lodashGet(pricing, 'deduction', [])}
          addition={lodashGet(pricing, 'addition', [])}
          refundAmount={lodashGet(pricing, 'finalPrice.value', '')}
        />
        <Flex justify="center" align="center" gap={6} fullWidth withWrap>
          <P1 textAlign="center" color={colors.red[700]}>
            <Trans
              i18nKey="warningRefeundInformation"
              t={t}
              values={{ storeName }}
              components={{
                storePolicy: (
                  <Link to={order.store.agreement_url} relative={false}>
                    placeholder
                  </Link>
                ),
                bolder: (
                  <P1
                    text={message}
                    textAlign="center"
                    color={colors.red[700]}
                    weight={700}
                  />
                ),
              }}
            />
          </P1>
        </Flex>
      </Flex>
    </WarningWrapper>
  );
}
