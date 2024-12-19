import React from 'react';

import { StepperStore } from './context';
import { StyledPanel } from './styles';
import { PanelType } from './types';

export default function StepperPanel({ children, value }: PanelType) {
  const {
    activeStep,
    updateActiveStep,
    handleCompleted,
    handleFailed,
    handleBack,
    handleNext,
    completed,
    failed,
  } = React.useContext(StepperStore);

  if (activeStep !== value) return null;

  return (
    <StyledPanel>
      {typeof children === 'function'
        ? children({
            activeStep,
            updateActiveStep,
            handleCompleted,
            handleFailed,
            handleBack,
            handleNext,
            completed,
            failed,
            isActiveStep: activeStep === value,
            index: value,
          })
        : children}
    </StyledPanel>
  );
}
