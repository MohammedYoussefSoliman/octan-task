import React from 'react';

import _ from 'lodash';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { SingleValue } from 'react-select';

import { ControllerType } from '../types';

import { AsyncSelectProps } from './types';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  AsyncSelectProps;

export default function withHookFormController<
  FormType extends FieldValues,
  Props extends WithControllerProps<FormType>,
>(Component: React.ComponentType<Omit<Props, keyof ControllerType<FormType>>>) {
  return React.memo(function ControlledComponent({
    control,
    validationRules,
    ...rest
  }: Props) {
    const { name } = rest;
    return (
      <Controller
        name={name as Path<FormType>}
        control={control}
        rules={{ ...validationRules }}
        render={({ field: { ref, ...fields }, fieldState: { error } }) => (
          <Component
            {...fields}
            {...rest}
            inputRef={ref}
            value={rest.value}
            defaultValue={rest.defaultValue}
            error={error?.message}
            onChange={(val) => {
              if (val) {
                if (_.isArray(val)) {
                  fields.onChange(val.map((c) => c.value));
                  if (rest.changeHandler)
                    rest.changeHandler(val.map((c) => c.value));
                } else {
                  const value = val as SingleValue<any>;
                  fields.onChange(value.value);
                  if (rest.changeHandler) rest.changeHandler(value.value);
                }
              }
            }}
          />
        )}
      />
    );
  });
}
