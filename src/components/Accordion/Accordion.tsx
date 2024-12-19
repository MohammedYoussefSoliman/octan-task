/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { AccordionSummaryProps } from '@mui/material/AccordionSummary';

import { withThemeProvider, withMuiThemeProvider } from '@/Providers';

import {
  StyledAccordionDetails,
  AccordionSummary,
  StyledAccordion,
  AccordionOrderSummary,
  StyledOrderAccordion,
  StyledFaqAccordion,
  AccordionFaqSummary,
  StyledAccordionOrderDetails,
  StyledAccordionFaqDetails,
} from './styles';

type Props = {
  summary: React.ReactNode;
  details: React.ReactNode;
  expanded: boolean;
  onChange?: (value: boolean) => void;
  onClick?: (event?: React.ChangeEvent<any>) => void;
  expandIcon?: AccordionSummaryProps['expandIcon'];
  variant?: 'order' | 'faqs' | 'normal';
};

type ContentProps = {
  children: React.ReactNode;
};

function ContentComponent({ children }: ContentProps) {
  return <div style={{ width: '100%' }}>{children}</div>;
}
const Content = withThemeProvider<ContentProps>(ContentComponent);

function Accordion({
  expanded,
  onChange,
  summary,
  details,
  expandIcon,
  variant,
  onClick,
}: Props) {
  let AccordionSummaryComponent;
  let AccordionComponent;
  let AccordionDetails;

  switch (variant) {
    case 'order':
      AccordionComponent = StyledOrderAccordion;
      AccordionSummaryComponent = AccordionOrderSummary;
      AccordionDetails = StyledAccordionOrderDetails;
      break;
    case 'faqs':
      AccordionComponent = StyledFaqAccordion;
      AccordionSummaryComponent = AccordionFaqSummary;
      AccordionDetails = StyledAccordionFaqDetails;
      break;
    default:
      AccordionComponent = StyledAccordion;
      AccordionSummaryComponent = AccordionSummary;
      AccordionDetails = StyledAccordionDetails;
  }

  return (
    <AccordionComponent
      expanded={expanded}
      onChange={() => {
        if (onChange) onChange(!expanded);
      }}
    >
      <AccordionSummaryComponent onClick={onClick} expandIcon={expandIcon}>
        <Content>{summary}</Content>
      </AccordionSummaryComponent>
      <AccordionDetails>
        <Content>{details}</Content>
      </AccordionDetails>
    </AccordionComponent>
  );
}

export default withMuiThemeProvider<Props>(Accordion);
