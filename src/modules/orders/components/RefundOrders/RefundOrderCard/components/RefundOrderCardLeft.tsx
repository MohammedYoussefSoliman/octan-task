import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Flex, Badge, P1, P3, H6 } from '@/components';
import { ReturnVariant } from '@/components/StatusStepper/types';
import { useBreakpoints } from '@/hooks';

import { StoreLogo, RefundOrderCardLeftWrapper } from './styles';

type InfoProps = {
  orderId: string;
  storeName: string;
  storeLogo: {
    src: string;
    alt: string;
  };
  orderNumber: string | number;
  statusVariant?: ReturnVariant;
  price: number;
  currency?: string;
};

export default function RefundOrderCardLeft({
  orderId,
  storeName,
  storeLogo,
  orderNumber,
  statusVariant,
  price,
  currency = 'SAR',
}: InfoProps) {
  const { pallet } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { medium } = useBreakpoints();

  return (
    <RefundOrderCardLeftWrapper
      gap={{ xs: 6, md: 10, lg: 20 }}
      pv={{ xs: 10, md: 13 }}
      ph={{ xs: 16 }}
      align="center"
      justify="space-between"
      flex={1}
      as="button"
      onClick={() => {
        navigate(`/orders/${orderId}`);
      }}
    >
      <Flex gap={{ xs: 7, md: 14 }}>
        <div>
          <Flex align="center" gap={{ xs: 5, md: 9, lg: 18 }}>
            <StoreLogo>
              <img src={storeLogo.src} alt={storeLogo.alt} />
            </StoreLogo>
            <P1
              text={storeName}
              color={pallet.text.heading}
              weight={500}
              truncationWidth={!medium ? '100px' : undefined}
            />
          </Flex>
          <P3
            text={`${orderNumber}`}
            color={pallet.text.heading}
            weight={400}
            startAdornment="#"
          />
        </div>
        {medium && statusVariant && (
          <Badge
            status={
              statusVariant.state === 'failure'
                ? 'rejected'
                : statusVariant.state === 'success'
                  ? 'accepted'
                  : 'pending'
            }
            label={statusVariant.statusText}
            isSmall
          />
        )}
      </Flex>
      <H6 text={`${price} ${t(currency)}`} />
    </RefundOrderCardLeftWrapper>
  );
}
