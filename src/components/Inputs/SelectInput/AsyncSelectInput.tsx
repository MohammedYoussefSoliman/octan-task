import React from 'react';

import _ from 'lodash';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ControllerType } from '../types';

import AsyncSelect from './AsyncSelect';
import { AsyncSelectProps } from './types';
import withHookFormController from './withAsyncHookFormController';

type WithControllerProps<T extends FieldValues> = ControllerType<T> &
  AsyncSelectProps;

export default function AsyncSelectInput<T extends FieldValues>(
  props: WithControllerProps<T>,
) {
  const Select = React.useMemo(
    () => withHookFormController<T, WithControllerProps<T>>(AsyncSelect),
    [],
  );

  const { required } = props;
  const { t } = useTranslation('app');

  return (
    <Select
      validationRules={
        required
          ? {
              validate: (value) =>
                !_.isEmpty(value) ||
                t(typeof required === 'string' ? required : 'requiredField'),
            }
          : undefined
      }
      {...props}
    />
  );
}
