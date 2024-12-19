import React from 'react';

import MuiCircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import { useLocalTheme } from '@/hooks';
import { withMuiThemeProvider } from '@/Providers';

import SpinnerWrapper from './styles';

interface SpinnerProps extends CircularProgressProps {
  bottomColor?: React.CSSProperties['color'];
  topColor?: React.CSSProperties['color'];
  margin?: React.CSSProperties['color'];
}

function Spinner(props: SpinnerProps) {
  const { bottomColor, topColor, margin, size = 25, ...rest } = props;

  const { pallet } = useLocalTheme();

  return (
    <SpinnerWrapper wrapperPadding={margin} size={`${size}px`}>
      <MuiCircularProgress
        variant="determinate"
        sx={{
          color: bottomColor || pallet.primary[100],
          animationDuration: '900ms',
          position: 'absolute',
          left: 0,
        }}
        size={size}
        thickness={5}
        value={100}
        {...rest}
      />
      <MuiCircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: topColor || pallet.primary[500],
          animationDuration: '900ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={size}
        thickness={5}
        {...rest}
      />
    </SpinnerWrapper>
  );
}

export default withMuiThemeProvider<SpinnerProps>(Spinner);
