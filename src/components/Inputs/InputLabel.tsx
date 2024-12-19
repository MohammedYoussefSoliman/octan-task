import { useTheme } from '@emotion/react';

import { P3 } from '@/components/Typography';

import { Label, Sup } from './styles';

type LabelProps = {
  label: string;
  required?: true | string;
  withTruncation?: boolean;
};

export default function InputLabel({
  label,
  required,
  withTruncation = true,
}: LabelProps) {
  const { pallet } = useTheme();
  return (
    <Label>
      <P3
        text={label}
        fontSize={{ xs: '14px', md: '16px' }}
        color={pallet.text.heading}
        truncationWidth={withTruncation ? '200px' : undefined}
        capitalizeFirstLetter
        className="label--paragraph"
      />
      {required && <Sup>*</Sup>}
    </Label>
  );
}
