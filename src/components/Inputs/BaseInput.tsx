import React from 'react';

import { useTranslation } from 'react-i18next';

import { Flex, Small } from '@/components';

import InputError from './InputError';
import InputLabel from './InputLabel';
import { Input, Wrapper } from './styles';
import { InputPropsType } from './types';

export default React.forwardRef(
  (
    {
      name,
      label,
      variant = 'outlined',
      prefixComponent,
      suffixComponent,
      width,
      height,
      error,
      placeholder,
      className,
      rounded,
      required,
      borderless,
      dense,
      helper,
      color,
      ...InputProps
    }: InputPropsType,
    ref: React.LegacyRef<HTMLInputElement>,
  ) => {
    const { t } = useTranslation('app');

    return (
      <Flex
        className={className}
        width={width || '100%'}
        direction="column"
        justify="end"
        gap={{ xs: 5, md: 8 }}
        ph="2px"
      >
        {label && <InputLabel label={label} required={required} />}
        <Wrapper
          className="input--wrapper"
          variant={variant}
          height={height}
          error={!!error}
          rounded={rounded}
          borderless={borderless}
          dense={dense}
          align="center"
          justify="space-between"
          color={color}
        >
          {prefixComponent && prefixComponent}
          <Input
            name={name}
            ref={ref}
            variant={variant}
            error={!!error}
            adornment={Boolean(suffixComponent || prefixComponent)}
            dense={dense}
            placeholder={placeholder && t(placeholder)}
            {...InputProps}
          />
          {suffixComponent && suffixComponent}
        </Wrapper>
        {typeof helper === 'string' ? (
          <Flex ms={{ xs: 6, sm: 8 }}>
            <Small text={helper} />
          </Flex>
        ) : (
          helper
        )}
        {error && <InputError error={error} name={name} />}
      </Flex>
    );
  },
);
