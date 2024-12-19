import { useMediaQuery } from '@mui/material';

import devices from '@/theme/sizes';

export default function useBreakpoints() {
  const hd = useMediaQuery(devices.hd);
  const xxLarge = useMediaQuery(devices.xxl);
  const xLarge = useMediaQuery(devices.xl);
  const large = useMediaQuery(devices.lg);
  const medium = useMediaQuery(devices.md);
  const small = useMediaQuery(devices.sm);
  const xSmall = useMediaQuery(devices.xs);
  return {
    hd,
    xxLarge,
    xLarge,
    large,
    medium,
    small,
    xSmall,
  };
}
