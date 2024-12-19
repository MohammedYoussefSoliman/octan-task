import { Paper, Flex, P1, H6, Icon, IconButton } from '@/components';
import { useBreakpoints } from '@/hooks';

import { Figure } from './styles';
import { MediaCardProps } from './types';

export default function MediaCard({
  icon,
  heading,
  text,
  onClick,
  width,
  className,
}: MediaCardProps) {
  const { medium, large } = useBreakpoints();
  return (
    <Paper
      gap={{ xs: 8, md: 16, lg: 32 }}
      align="center"
      justify="space-between"
      width={width || '100%'}
      className={className}
    >
      <Flex
        direction={medium ? 'row' : 'column'}
        gap={{ xs: 10, md: 20, lg: 40 }}
        align={medium ? 'center' : 'flex-start'}
        flex={1}
        height="auto"
      >
        <Figure>
          <Icon name={icon} size={large ? 75 : 45} />
        </Figure>
        <Flex direction="column" flex={1} fullWidth={!medium}>
          <H6 text={heading} />
          {text && <P1 text={text} truncationWidth="100%" />}
        </Flex>
      </Flex>
      {onClick && (
        <IconButton
          icon="arrow-left"
          size="md"
          variant="light"
          onClick={onClick}
        />
      )}
    </Paper>
  );
}
