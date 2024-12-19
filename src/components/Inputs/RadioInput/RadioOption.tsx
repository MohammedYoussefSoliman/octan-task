import React from 'react';

import { useTranslation } from 'react-i18next';

import { useLocalTheme } from '@/hooks';

import { P3 } from '../../Typography';

import { BanRadioButton, Input, OptionLabel, RadioButton } from './styles';

type Props = {
  name: string;
  label?: string;
  value: string;
  variant?: 'ban' | 'normal';
  activeValue?: number | string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const variants = {
  normal: RadioButton,
  ban: BanRadioButton,
};

export default function RadioOption({
  name,
  label,
  value,
  variant = 'normal',
  activeValue,
  changeHandler,
}: Props) {
  const Radio = variants[variant];
  const { t } = useTranslation('app');

  const { branding } = useLocalTheme();

  return (
    <OptionLabel branding={branding} as="label" gap={{ xs: 6, md: 10, lg: 14 }}>
      <Radio branding={branding} checked={value === activeValue}>
        {variant === 'normal' && <div className="selected" />}
        {label && t(label)}
      </Radio>
      {variant === 'normal' && label && (
        <P3 text={label} capitalizeFirstLetter />
      )}

      <Input name={name} onChange={changeHandler} value={value} type="radio" />
    </OptionLabel>
  );
}
