import React from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import BaseInput from './BaseInput';
import { InputPropsType, ControllerType } from './types';
import withHookFormController from './withHookFormController';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  InputPropsType;

export default function NumberInput<T extends FieldValues>({
  validationRules,
  ...props
}: WithControllerProps<T>) {
  const Input = React.useMemo(
    () => withHookFormController<T, WithControllerProps<T>>(BaseInput),
    [],
  );

  const { required } = props;
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
    <Input
      type="number"
      pattern="\d*"
      validationRules={{
        ...resolvedRequired,
        ...validationRules,
      }}
      {...props}
    />
  );
}
