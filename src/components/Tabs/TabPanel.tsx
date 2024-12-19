import React from 'react';

import { TabsStore } from './context';
import { StyledPanel } from './styles';
import { PanelType } from './types';

export default function TabPanel({ children, label, value }: PanelType) {
  const { activeTab, updateHeaders } = React.useContext(TabsStore);

  React.useEffect(() => {
    updateHeaders({ label, value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, value]);

  return <StyledPanel hidden={activeTab !== value}>{children}</StyledPanel>;
}
