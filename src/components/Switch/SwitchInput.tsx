import { SwitchProps } from '@radix-ui/react-switch';
import { forwardRef, ElementRef } from 'react';

import { Typography } from '@/components';

import { Switch } from './Switch';

type SwitchInputProps = SwitchProps & {
  label?: string;
};

export const SwitchInput = forwardRef<ElementRef<typeof Switch>>(
  ({ label, ...props }: SwitchInputProps, ref) => {
    return (
      <div className="flex items-center gap-2">
        <Switch ref={ref} {...props} />
        {label && (
          <label>
            <Typography as="p2">{label}</Typography>
          </label>
        )}
      </div>
    );
  },
);
