/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { FieldValues } from 'react-hook-form';

import { CheckboxPropsType, ControllerType } from '../types';

import CheckBoxBase from './CheckBox';
import withHookFormController from './withHookFormController';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  CheckboxPropsType;

export default function CheckBox<T extends FieldValues>({
  validationRules,
  ...props
}: WithControllerProps<T>) {
  const Input = React.useMemo(
    () => withHookFormController<T, WithControllerProps<T>>(CheckBoxBase),
    [],
  );

  return <Input {...props} />;
}
