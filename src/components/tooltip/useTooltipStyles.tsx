import { styled } from '@mui/material/styles';
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';

type HookProps = {
  tooltipStyles?: {
    [key: string]: string | number;
  };
  arrowStyles?: {
    [key: string]: string | number;
  };
};

export default function useTooltipStyles({
  tooltipStyles,
  arrowStyles,
}: HookProps) {
  return styled(({ className, ...props }: TooltipProps) => (
    <MuiTooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      ...tooltipStyles,
    },
    [`& .${tooltipClasses.arrow}`]: {
      ...arrowStyles,
    },
  }));
}
