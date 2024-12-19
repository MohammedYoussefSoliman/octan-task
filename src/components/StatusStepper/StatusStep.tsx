import React from 'react';

import { P1 } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';

import { StateWrapper } from './styles';
import { StatusStep } from './types';

const resolveStatusNegativeMargin = (
  media: 'xSmall' | 'medium' | 'large',
  width: number,
): number => {
  const stateFigureSizes = {
    xSmall: 40,
    medium: 50,
    large: 70,
  };

  const currentSize = stateFigureSizes[media];
  if (width > currentSize) {
    return (width - currentSize) / 2;
  }
  return 0;
};

export default function StatusStepper({
  iconUrl,
  isCurrent,
  state,
  statusText,
}: StatusStep) {
  const { medium, large } = useBreakpoints();
  const stateRef = React.useRef<HTMLDivElement>(null);
  const [negativeMargin, setNegativeMargin] = React.useState<number>(0);
  React.useLayoutEffect(() => {
    if (stateRef.current) {
      const width = stateRef.current.getBoundingClientRect().width!;

      setNegativeMargin(
        resolveStatusNegativeMargin(
          large ? 'large' : medium ? 'medium' : 'xSmall',
          width,
        ),
      );
    }
  }, [large, medium]);

  return (
    <StateWrapper
      ref={stateRef}
      orderState={
        state === 'failure'
          ? 'failure'
          : state === 'success'
            ? 'success'
            : isCurrent
              ? 'current'
              : state
      }
      negativeMargin={negativeMargin}
      direction="column"
      align="center"
      gap={{ xs: 5, md: 10 }}
    >
      <div className="status">
        <img className="status--icon" src={iconUrl} alt={statusText} />
      </div>
      <P1
        text={statusText}
        weight={isCurrent ? 600 : 400}
        className="label"
        capitalizeFirstLetter
      />
    </StateWrapper>
  );
}
