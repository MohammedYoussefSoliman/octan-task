import { v4 as uuidv4 } from 'uuid';

import { Flex } from '../Grids';

import Provider from './context';
import Header from './Header';
import Panel from './Panel';
import { StepsType } from './types';

export default function Stepper({
  steps,
  readOnly,
  currentStep,
}: Omit<StepsType, 'children'>) {
  return (
    <Provider steps={steps} currentStep={currentStep}>
      <Flex direction="column" gap={{ xs: 12, md: 25, lg: 50 }} fullWidth>
        <Header readOnly={readOnly} />
        <Flex fullWidth>
          {steps.map((step, index) => (
            <Panel value={index} key={`step-panel${uuidv4()}`}>
              {step.children}
            </Panel>
          ))}
        </Flex>
      </Flex>
    </Provider>
  );
}
