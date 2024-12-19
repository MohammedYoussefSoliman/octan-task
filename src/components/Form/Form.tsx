import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { FormProps } from './types';

export function Form<T extends FieldValues>({
  defaultValues,
  onSubmit = (data) => {
    return data;
  },
  children,
  validateOn = 'onSubmit',
  reValidateOn = 'onChange',
  resolver,
  className,
  ...htmlProps
}: FormProps<T>) {
  const methods = useForm<T>({
    mode: validateOn,
    reValidateMode: reValidateOn,
    defaultValues,
    resolver,
  });

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...htmlProps}
        data-testid="hook-form"
      >
        {typeof children === 'function'
          ? children({
              ...methods,
            })
          : children}
      </form>
    </FormProvider>
  );
}
