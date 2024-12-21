import { useTheme } from '@emotion/react';
import { useFormContext } from 'react-hook-form';

import { Flex, Button } from '@/components';
import { useStepperApi } from '@/components/Stepper';
import { useBreakpoints } from '@/hooks';

type Props = {
  watchedKey?: string;
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
};

export default function StepAction({
  watchedKey,
  label,
  onClick,
  isLoading,
}: Props) {
  const { handleNext, handleCompleted, activeStep } = useStepperApi();
  const { medium } = useBreakpoints();
  const { watch } = useFormContext();

  const {
    branding: { primaryColor },
  } = useTheme();

  let watchedValue: any;
  if (watchedKey) {
    watchedValue = watch(watchedKey);
  }

  return (
    <Flex ms="auto" fullWidth={!medium}>
      <Flex minWidth="200px" fullWidth>
        <Button
          onClick={() => {
            handleCompleted(activeStep);
            if (!onClick) handleNext();
            if (onClick) onClick();
          }}
          type="button"
          isLoading={isLoading}
          color={primaryColor}
          disabled={(!!watchedKey && !watchedValue) || isLoading}
          fullWidth
        >
          {label || 'next'}
        </Button>
      </Flex>
    </Flex>
  );
}
