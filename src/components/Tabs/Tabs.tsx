import { Flex } from '../Grids';

import Provider from './context';
import TabsHeader from './TabsHeader';
import { TabsType } from './types';

export default function Tabs({ defaultValue, children }: TabsType) {
  return (
    <Provider defaultValue={defaultValue}>
      <Flex direction="column" gap={{ xs: 8, md: 16, lg: 32 }} fullWidth>
        <TabsHeader />
        {children}
      </Flex>
    </Provider>
  );
}
