import React from 'react';

import { useTheme } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';

import { Flex, GoBack, Logo, StoreLogo } from '@/components';

import { StepperStore } from './context';
import { StepButton, StepLine } from './styles';
import { HeaderType } from './types';

export default function Header({ readOnly }: HeaderType) {
  const { steps, failed, completed, activeStep, updateActiveStep, handleBack } =
    React.useContext(StepperStore);

  const handleIsCompleted = (index: number): boolean =>
    completed ? completed[index] : false;
  const handleIsFailed = (index: number): boolean =>
    failed ? failed[index] : false;

  const {
    branding: { logo, isEnabled: isBranded },
  } = useTheme();

  if (steps.length <= 0) return null;
  return (
    <Flex
      gap={{ xs: 8, md: 16, lg: 32 }}
      direction={{ xs: 'column', md: 'row' }}
      justify="space-between"
      align={{ xs: 'flex-start', md: 'center' }}
      fullWidth
    >
      <GoBack callback={handleBack} />
      <Flex
        align="center"
        justify="space-between"
        gap={{ xs: 6, md: 12, lg: 24 }}
        width={{ xs: '100%', md: '70%', lg: '60%', xl: '50%' }}
        withWrap
      >
        {steps.map((step, index) => (
          <React.Fragment key={`step-${activeStep}-header-${uuidv4()}`}>
            <StepButton
              active={activeStep === index}
              disabled={readOnly || step.readonly || !handleIsCompleted(index)}
              failed={handleIsFailed(index)}
              completed={handleIsCompleted(index)}
              onClick={() => updateActiveStep(index)}
            >
              {index + 1}
            </StepButton>
            {index < steps.length - 1 && (
              <StepLine
                active={activeStep === index}
                failed={handleIsFailed(index)}
                completed={handleIsCompleted(index)}
              />
            )}
          </React.Fragment>
        ))}
      </Flex>
      {isBranded ? (
        <StoreLogo url={logo?.url ?? ''} image={logo?.image ?? ''} />
      ) : (
        <Logo size={120} />
      )}
    </Flex>
  );
}
