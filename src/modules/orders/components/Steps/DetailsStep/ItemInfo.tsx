import { useTheme } from '@emotion/react';

import { Flex, P1, P3 } from '@/components';

type Props = {
  label?: string;
  value: string | string[];
  isPrice?: boolean;
};

export default function ItemInfo({ label, value, isPrice }: Props) {
  const { pallet, branding } = useTheme();

  return (
    <Flex direction="column" gap={{ xs: 6, md: 9, lg: 12 }}>
      {label && <P3 text={label} capitalizeFirstLetter />}
      {typeof value === 'string' ? (
        <P1
          text={value}
          color={
            isPrice
              ? (branding.primaryColor ?? pallet.primary[500])
              : pallet.text.heading
          }
          weight={isPrice ? 600 : 500}
          capitalizeFirstLetter
        />
      ) : (
        <div>
          {value.length > 1 ? (
            value.map((text, index) => (
              <P1
                key={text}
                text={`${index + 1}. ${text}`}
                color={isPrice ? pallet.primary[500] : pallet.text.heading}
                weight={isPrice ? 600 : 500}
                capitalizeFirstLetter
              />
            ))
          ) : (
            <P1
              text={value[0]}
              color={isPrice ? pallet.primary[500] : pallet.text.heading}
              weight={isPrice ? 600 : 500}
              capitalizeFirstLetter
            />
          )}
        </div>
      )}
    </Flex>
  );
}
