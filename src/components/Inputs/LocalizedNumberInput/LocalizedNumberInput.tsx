/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import _ from 'lodash';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import MaskedInput from 'react-text-mask';

import { NUMBER_MASK } from '@/helpers/constants';

import BaseInput from '../BaseInput';
import { ControllerType, MaskedInputProps } from '../types';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  PartialBy<MaskedInputProps, 'maskProps'>;

export default function LocalizedNumberInput<T extends FieldValues>({
  control,
  validationRules,
  maskProps = {
    mask: NUMBER_MASK,
    guide: false,
  },
  color,
  ...props
}: WithControllerProps<T>) {
  const { name, required } = props;
  const { t } = useTranslation('app');

  const resolvedRequired = React.useMemo(() => {
    let obj = {};
    if (required) {
      obj = {
        validate: (value: any) =>
          !_.isEmpty(value) ||
          t(typeof required === 'string' ? required : 'requiredField'),
      };
    }
    return obj;
  }, [required, t]);

  return (
    <Controller
      name={name as Path<T>}
      control={control}
      rules={{
        ...resolvedRequired,
        ...validationRules,
      }}
      render={({
        field: { ref, onChange, ...fields },
        fieldState: { error },
      }) => {
        return (
          <MaskedInput
            value={fields.value}
            onChange={(e) => {
              if (props.changeHandler) props.changeHandler(e);
              onChange(e);
            }}
            placeholder={props.placeholder}
            {...maskProps}
            render={(maskRef, rest) => (
              <BaseInput
                ref={maskRef as any}
                error={error?.message}
                inputMode="numeric"
                color={color}
                {...props}
                {...rest}
              />
            )}
          />
        );
      }}
    />
  );
}
