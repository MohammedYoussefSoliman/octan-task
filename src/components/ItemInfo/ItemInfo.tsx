import React from 'react';

import { useTheme } from '@emotion/react';

import { Flex, P3 } from '@/components';

type Props = {
  label: string;
  children: React.ReactNode;
  helper?: string;
};

export default function ItemInfo({ label, children, helper }: Props) {
  const { pallet } = useTheme();
  return (
    <Flex direction="column" gap="8px">
      <P3 text={label} capitalizeFirstLetter />
      <div>
        {children}
        {helper && (
          <P3
            text={helper}
            color={pallet.text.heading}
            startAdornment="("
            endAdornment=")"
          />
        )}
      </div>
    </Flex>
  );
}
