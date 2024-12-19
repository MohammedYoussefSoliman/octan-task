import images from '@/assets/images';

import { RefundStatus } from './types';

export const othStatusSample = {
  name: 'waiting-shipping',
  statusText: 'waiting-shipping',
  variant: {
    name: 'overdue',
    icon: 'iconPath',
  },
  state: 'failure',
  statusInfo: null,
  statusDescription: null,

  isCurrent: false,
};

const { statuses: icons } = images;

type StatusesMock = {
  id: string;
  orderStatuses: RefundStatus[];
};

export const orderStatusesMock: StatusesMock[] = [
  {
    id: '97f2e15c-49a1-4ec8-a941-f44272a57a09',
    orderStatuses: [
      {
        name: 'submitted',
        statusText: 'submitted',
        state: 'passed',
        variant: null,
        icon: icons.submitted.passed,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'refunded',
        statusText: 'refunded',
        state: 'success',
        variant: null,
        icon: icons.refunded.success,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'waiting-shipping',
        statusText: 'waiting-shipping',
        state: 'failure',
        variant: {
          name: 'overdue',
          icon: icons.failed,
        },
        icon: icons.shipping.current,
        isCurrent: true,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'shipped',
        statusText: 'shipped',
        state: null,
        variant: null,
        icon: icons.shipped.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'completed',
        statusText: 'completed',
        state: null,
        variant: null,
        icon: icons.completed.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
    ],
  },
  {
    id: '97f2efbe-1745-44cd-bba7-12bd44811c3a',
    orderStatuses: [
      {
        name: 'submitted',
        statusText: 'submitted',
        state: 'passed',
        variant: null,
        icon: icons.submitted.passed,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'refunded',
        statusText: 'refunded',
        state: 'success',
        variant: null,
        icon: icons.refunded.success,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'waiting-shipping',
        statusText: 'waiting-shipping',
        state: 'success',
        variant: {
          name: 'items shipped',
          icon: icons.success,
        },
        icon: icons.shipping.passed,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'shipped',
        statusText: 'shipped',
        state: 'passed',
        variant: null,
        icon: icons.shipped.passed,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'completed',
        statusText: 'completed',
        state: 'mixed',
        variant: null,
        icon: icons.completed.mixed,
        isCurrent: true,
        statusDescription: null,
        statusInfo: {
          items: [
            {
              id: '97f2efbe-1950-457b-a8e6-f659bbf050b5',
              status: 'rejected',
              feedback:
                'this item is not damaged we tried it, please check the attached video',
            },
            {
              id: '97f2efbe-1a35-4d97-b3ad-1f5b4aebcd45',
              status: 'accepted',
              feedback:
                'we are sorry we made that mistake, we will compensate you properly',
            },
          ],
        },
      },
    ],
  },
  {
    id: '97f35e54-f834-4529-b8ad-31e514488f6e',
    orderStatuses: [
      {
        name: 'submitted',
        statusText: 'submitted',
        state: 'passed',
        variant: null,
        icon: icons.submitted.passed,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'refunded',
        statusText: 'refunded',
        state: 'success',
        variant: null,
        icon: icons.refunded.success,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'waiting-shipping',
        statusText: 'waiting-shipping',
        state: 'success',
        variant: {
          name: 'items-shipped',
          icon: icons.success,
        },
        icon: icons.shipping.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'shipped',
        statusText: 'shipped',
        state: null,
        variant: null,
        icon: icons.shipped.current,
        isCurrent: true,
        statusInfo: {
          shippingStatus:
            'Items have been shipped and will be arrived to store within 2 days',
        },
        statusDescription: null,
      },
      {
        name: 'completed',
        statusText: 'completed',
        state: null,
        variant: null,
        icon: icons.completed.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
    ],
  },
  {
    id: '97f35ef1-bb9c-4d7a-8a13-b13fc60e9e20',
    orderStatuses: [
      {
        name: 'submitted',
        statusText: 'submitted',
        state: null,
        variant: null,
        icon: icons.submitted.current,
        isCurrent: true,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'refunded',
        statusText: 'refunded',
        state: null,
        variant: null,
        icon: icons.refunded.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'waiting-shipping',
        statusText: 'waiting-shipping',
        state: null,
        variant: null,
        icon: icons.shipping.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'shipped',
        statusText: 'shipped',
        state: null,
        variant: null,
        icon: icons.shipped.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
      {
        name: 'completed',
        statusText: 'completed',
        state: null,
        variant: null,
        icon: icons.completed.normal,
        isCurrent: false,
        statusInfo: null,
        statusDescription: null,
      },
    ],
  },
];
