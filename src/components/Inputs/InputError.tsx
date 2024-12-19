import React from 'react';

import { useTheme } from '@emotion/react';

import { Typography } from '@/components/Typography';

type Props = {
  error: string;
  name?: string;
};

export default function InputError({ error, name }: Props) {
  const {
    pallet: {
      text: { error: errorColor },
    },
  } = useTheme();

  return (
    <Typography
      id={name}
      text={error}
      color={errorColor}
      fontSize={{ xs: '12px', md: '14px' }}
      weight={500}
      capitalizeFirstLetter
      className="input-error"
    />
  );
}
