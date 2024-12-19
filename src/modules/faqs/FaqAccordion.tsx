import React from 'react';

import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Accordion, Flex, HTML, Icon, H6 } from '@/components';

import { FaqType } from './types';

type Props = Pick<FaqType, 'question' | 'answer'> & {
  isTranslated?: boolean;
};

export default function FaqAccordion({
  question,
  answer,
  isTranslated = true,
}: Props) {
  const { pallet, colors } = useTheme();
  const { t } = useTranslation('app');
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <Accordion
      variant="faqs"
      onChange={() => setIsExpanded((prev) => !prev)}
      summary={
        <Flex justify="space-between">
          <H6
            text={isTranslated ? question : t(question)}
            weight={600}
            color={pallet.text.heading}
          />
        </Flex>
      }
      details={<HTML content={isTranslated ? answer : t(answer)} />}
      expandIcon={<Icon name="chevron-down" color={colors.purple[500]} />}
      expanded={isExpanded}
    />
  );
}
