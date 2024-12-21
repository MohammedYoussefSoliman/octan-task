import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Icon, P3, Button, IconButton, Flex } from '@/components';
import { useBreakpoints } from '@/hooks';

type Props = {
  expanded: boolean;
  toggleExpanded: () => void;
  count: number;
};

export default function ExpandButton({
  expanded,
  toggleExpanded,
  count,
}: Props) {
  const { t } = useTranslation('app');
  const { colors } = useTheme();
  const { medium } = useBreakpoints();

  if (medium) {
    return (
      <Button
        onClick={(event) => {
          event?.stopPropagation();
          toggleExpanded();
        }}
      >
        <Flex align="center" gap={{ xs: 5, md: 8 }}>
          <P3 color={colors.shades[100]} weight={500}>
            {`${count} ${t('items')}`}
          </P3>
          <Icon
            color={colors.shades[100]}
            name={`chevron-${expanded ? 'up' : 'down'}`}
            size={20}
          />
        </Flex>
      </Button>
    );
  }
  return (
    <IconButton
      onClick={(event) => {
        event?.stopPropagation();
        toggleExpanded();
      }}
      icon={`chevron-${expanded ? 'up' : 'down'}`}
      size="md"
      variant="primary"
      as="div"
    />
  );
}
