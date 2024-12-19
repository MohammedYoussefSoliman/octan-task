import { Flex, H6, Paper } from '@/components';
import { useBreakpoints } from '@/hooks';

import { Wrapper } from './styles';
import { CardProps } from './types';

export default function Card({
  heading,
  children,
  action,
  headerAction,
  width,
  className,
}: CardProps) {
  const { small } = useBreakpoints();

  return (
    <Wrapper direction="column" width={width || '100%'} className={className}>
      {heading && (
        <Paper
          className="heading"
          justify="space-between"
          align="center"
          fullWidth
        >
          {typeof heading === 'string' ? (
            <H6 text={heading} capitalizeFirstLetter />
          ) : (
            heading
          )}
          {headerAction}
        </Paper>
      )}
      <Paper className={heading ? 'withHeading' : undefined} fullWidth>
        <Flex gap={{ xs: 8, md: 12, lg: 16 }} direction="column" fullWidth>
          {children}
          {action && (
            <Flex
              gap={{ xs: 6, md: 12, lg: 24 }}
              direction={small ? 'row' : 'column'}
              justify="space-between"
              fullWidth
            >
              {action}
            </Flex>
          )}
        </Flex>
      </Paper>
    </Wrapper>
  );
}
