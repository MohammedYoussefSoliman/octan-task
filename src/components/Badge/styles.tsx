import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StatusType } from '@/helpers/types';
import * as colors from '@/theme/colors';
import devices from '@/theme/sizes';

type BadgeType = {
  status: StatusType;
  isSmall?: boolean;
};

const statusColors = {
  pending: css`
    .label {
      color: ${colors.text.body};
    }
    background-color: ${colors.grey[100]};
  `,
  accepted: css`
    .label {
      color: ${colors.text.success};
    }
    background-color: ${colors.green[200]};
  `,
  mixed: css`
    .label {
      color: ${colors.orange[700]};
    }
    background-color: ${colors.orange[100]};
  `,
  rejected: css`
    .label {
      color: ${colors.text.error};
    }
    background-color: ${colors.red[100]};
  `,
};

const resolveStatusStyle = (status: StatusType) => statusColors[status];

const StyledBadge = styled('div')<BadgeType>`
  label: status-badge;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  ${({ isSmall }) => css`
    padding: ${isSmall ? '4px' : '8px'};
    border-radius: ${isSmall ? '6px' : '9px'};
    height: 30px;
    ${devices.md} {
      padding: ${isSmall ? '8px' : '15px'};
    }
  `}
  ${({ status }) => resolveStatusStyle(status)}
`;

export default StyledBadge;
