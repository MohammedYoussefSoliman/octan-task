import React from 'react';

import { StepperStore } from './context';

export default function useStepperApi() {
  const api = React.useContext(StepperStore);
  return api;
}
