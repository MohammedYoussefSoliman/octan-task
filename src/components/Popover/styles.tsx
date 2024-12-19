import styled from '@emotion/styled';
import { Popover as MuiPopover } from '@mui/material';

import getTheme from '@/theme';
import devices from '@/theme/sizes';

const theme = getTheme('light');

const { shadows, colors } = theme;

const StyledPopover = styled(MuiPopover)`
  .MuiPaper-root {
    border-radius: 8px !important;
    padding: 14px;
    min-width: 250px;
    ${devices.sm} {
      padding: 16px;
    }
    ${devices.md} {
      border-radius: 20px !important;
    }
    box-shadow: ${shadows[4]};
    border: 1px solid ${colors.grey[100]};
  }
`;

export default StyledPopover;
