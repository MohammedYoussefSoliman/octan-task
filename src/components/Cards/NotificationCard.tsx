import { useTranslation } from 'react-i18next';

import { Paper, Icon, Button, Flex, H6 } from '@/components';
import { useBreakpoints } from '@/hooks';

import { Figure } from './styles';
import { NotificationCardProps } from './types';

export default function NotificationCard({
  icon,
  heading,
  onClick,
  width,
  buttonLabel,
  status,
  className,
}: NotificationCardProps) {
  const { small } = useBreakpoints();
  const { t } = useTranslation('app');

  return (
    <Paper
      gap={{ xs: 8, md: 16, lg: 32 }}
      align="center"
      justify="space-between"
      width={width || '100%'}
      className={className}
    >
      <Flex
        direction={small ? 'row' : 'column'}
        gap={{ xs: 10, md: 20, lg: 40 }}
        align={small ? 'center' : 'flex-start'}
        flex={1}
        height="auto"
      >
        <Figure status={status} dense>
          <Icon name={icon} size={45} />
        </Figure>
        <Flex direction="column" flex={1} fullWidth={!small}>
          <H6 text={heading} />
        </Flex>
      </Flex>
      <Button size="sm" onClick={onClick}>
        {t(buttonLabel || 'click')}
      </Button>
    </Paper>
  );
}
