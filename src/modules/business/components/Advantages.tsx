import React from 'react';

import { useTheme } from '@emotion/react';

import { Flex } from '@/components';
import { P2, P1, H2 } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';

import { AdvantagesGrid } from '../style';
import { AdvantagesType } from '../types';

type Props = AdvantagesType;

export default function Advantages({ records, title }: Props) {
  const { pallet } = useTheme();
  const { small } = useBreakpoints();
  const titleRefs = React.useRef(records.map(() => React.createRef()));
  const [titleHeight, setTitleHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const highestTitle: any = titleRefs.current.reduce(
      (prevElement: any, currentElement: any) =>
        prevElement.current.getBoundingClientRect().height >
        currentElement.current.getBoundingClientRect().height
          ? prevElement
          : currentElement,
    );
    setTitleHeight(highestTitle.current.getBoundingClientRect().height);
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      fullWidth
      gap={{ xs: 32, md: 42, lg: 83 }}
    >
      <H2 text={title} />
      <AdvantagesGrid>
        {records.map((record, index) => {
          return (
            <Flex
              direction="column"
              justify="center"
              gap={{ xs: 24 }}
              key={record.title}
            >
              <Flex direction="column" justify="center" gap={{ xs: 12 }}>
                <Flex className="icon" align="center" justify="center">
                  <img src={record.icon} alt={record.icon} />
                </Flex>
                <Flex
                  height={small && titleHeight ? `${titleHeight}px` : 'auto'}
                  ref={
                    titleRefs.current[index] as React.RefObject<HTMLDivElement>
                  }
                >
                  <P1
                    text={record.title}
                    weight={700}
                    color={pallet.text.heading}
                  />
                </Flex>
              </Flex>
              <P2 className="text" text={record.description} />
            </Flex>
          );
        })}
      </AdvantagesGrid>
    </Flex>
  );
}
