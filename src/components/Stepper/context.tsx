import React from "react";
import { StepsType, Status, AppContextInterface } from "./types";

export const StepperStore = React.createContext<AppContextInterface>({
  steps: [],
  updateActiveStep: () => {},
  handleNext: () => {},
  handleBack: () => {},
  handleCompleted: () => {},
  handleFailed: () => {},
  activeStep: 0,
  completed: {},
  failed: {},
});

const statusResolver = (
  steps: StepsType["steps"],
  type: "failed" | "completed",
) => {
  let stepperStatus: Status = {};
  steps.forEach((step, index) => {
    stepperStatus = { ...stepperStatus, [index]: Boolean(step[type]) };
  });
  return stepperStatus;
};

export default function Tabs({
  children,
  steps: currentSteps,
  currentStep,
}: StepsType) {
  const [steps] = React.useState<StepsType["steps"]>(currentSteps);
  const [activeStep, setActiveStep] = React.useState<number>(
    currentStep && currentStep < currentSteps.length ? currentStep : 0,
  );
  const [completed, setCompleted] = React.useState<Status>(
    statusResolver(currentSteps, "completed"),
  );
  const [failed, setFailed] = React.useState<Status>(
    statusResolver(currentSteps, "failed"),
  );

  const updateActiveStep = (index: number) => {
    setActiveStep(index);
  };

  const handleNext = (callback?: () => void) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((step) => step + 1);
      if (callback) callback();
    }
  };

  const handleBack = (callback?: () => void) => {
    if (activeStep > 0) {
      setActiveStep((step) => step - 1);
      if (callback) callback();
    }
  };
  const handleCompleted = (index: number, callback?: () => void) => {
    setCompleted((value) => ({ ...value, [index]: true }));
    if (callback) callback();
  };
  const handleFailed = (index: number, callback?: () => void) => {
    setCompleted((value) => ({ ...value, [index]: true }));
    setFailed((value) => ({ ...value, [index]: true }));
    if (callback) callback();
  };

  React.useEffect(() => {
    steps.forEach((step, stepIndex) => {
      if (currentStep && stepIndex < currentStep) {
        handleCompleted(stepIndex);
      }
    });
  }, [currentStep, steps]);

  const contextValues = React.useMemo(
    () => ({
      steps,
      updateActiveStep,
      handleNext,
      handleBack,
      handleCompleted,
      handleFailed,
      activeStep,
      completed,
      failed,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeStep, completed, failed, steps],
  );

  return (
    <StepperStore.Provider value={contextValues}>
      {children}
    </StepperStore.Provider>
  );
}
