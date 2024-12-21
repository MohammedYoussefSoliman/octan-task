import { Flex } from '@/components';
import { useBreakpoints } from '@/hooks';

import TutorCardStep from './TutorCardStep';
import { ImageStepsType } from './types';

type Props = {
  imageSteps: ImageStepsType[];
};

export default function HowSection({ imageSteps }: Props) {
  const { medium } = useBreakpoints();

  return (
    <Flex
      gap={{ xs: 10, md: 22, lg: 45 }}
      direction={medium ? 'row' : 'column'}
      align={medium ? 'flex-start' : 'center'}
      justify="space-between"
      fullWidth
      withWrap
    >
      {imageSteps.map((step, index) => {
        return (
          <TutorCardStep
            key={step.image}
            caption={step.caption}
            image={step.image}
            index={index}
          />
        );
      })}
    </Flex>
  );
}
