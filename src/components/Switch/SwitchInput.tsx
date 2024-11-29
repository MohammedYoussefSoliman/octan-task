import { forwardRef, ElementRef, ReactNode } from 'react';

import { SwitchProps } from '@radix-ui/react-switch';

import { Typography } from '@/components';

import { Switch } from './Switch';

type SwitchInputProps = {
  label?: ReactNode;
} & SwitchProps;

export const SwitchInput = forwardRef<
  ElementRef<typeof Switch>,
  SwitchInputProps
>(({ label, ...props }: SwitchInputProps, ref) => {
  const labelContent =
    typeof label === 'string' ? (
      <label>
        <Typography as="small">{label}</Typography>
      </label>
    ) : (
      label
    );
  return (
    <div className="flex items-center gap-2">
      <Switch ref={ref} {...props} />
      {label && labelContent}
    </div>
  );
});
