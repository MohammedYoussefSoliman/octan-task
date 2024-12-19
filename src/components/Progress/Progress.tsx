import MuiCircularProgress, {
  CircularProgressProps,
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import { useLocalTheme } from '@/hooks';
import { withMuiThemeProvider } from '@/Providers';

function Progress(props: CircularProgressProps) {
  const { size = 40 } = props;

  const { colors } = useLocalTheme();

  return (
    <MuiCircularProgress
      variant="determinate"
      sx={{
        color: colors.red[600],
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={size}
      thickness={8}
      {...props}
    />
  );
}

export default withMuiThemeProvider<CircularProgressProps>(Progress);
