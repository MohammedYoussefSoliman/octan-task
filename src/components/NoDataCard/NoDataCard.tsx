import { useTheme } from '@emotion/react';

import { Flex, Card, P1 } from '@/components';

type Props = {
  text: string;
};

export default function NoDataCard({ text }: Props) {
  const { pallet } = useTheme();
  return (
    <Card>
      <Flex fullWidth align="center" justify="center">
        <P1 text={text} color={pallet.primary.heading} capitalizeFirstLetter />
      </Flex>
    </Card>
  );
}
