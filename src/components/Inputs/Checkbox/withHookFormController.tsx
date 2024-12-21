import React from 'react';

import { Controller, FieldValues, Path } from 'react-hook-form';

import { ControllerType, CheckboxPropsType } from '../types';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  CheckboxPropsType;

export default function withHookFormController<
  FormType extends FieldValues,
  Props extends WithControllerProps<FormType>,
>(Component: React.ComponentType<Omit<Props, keyof ControllerType<FormType>>>) {
  return function ControlledComponent({
    control,
    validationRules,
    ...rest
  }: Props) {
    const { name, changeHandler } = rest;

    return (
      <Controller
        name={name as Path<FormType>}
        control={control}
        rules={{ ...validationRules }}
        render={({
          field: { ref, onChange, value, ...fields },
          fieldState: { error },
        }) => {
          return (
            <Component
              {...fields}
              checked={value}
              onChange={(e) => {
                onChange(e);
                if (changeHandler) changeHandler(e);
              }}
              inputRef={ref}
              error={error?.message}
              {...rest}
            />
          );
        }}
      />
    );
  };
}
