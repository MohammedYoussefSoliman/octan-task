import React from 'react';

import { useTranslation } from 'react-i18next';

import { TabsStore } from './context';
import { TabsWrappers, TabButton } from './styles';

export default function TabsHeader() {
  const { tabs, activeTab, updateActiveTab } = React.useContext(TabsStore);

  const { t } = useTranslation('app');

  if (tabs.length <= 0) return null;
  return (
    <TabsWrappers p="5px" gap="5px" align="center" withWrap>
      {tabs.map((tab) => (
        <TabButton
          key={`${tab.label}-${tab.value}`}
          active={activeTab === tab.value}
          onClick={() => updateActiveTab(tab.value)}
        >
          {t(tab.label)}
        </TabButton>
      ))}
    </TabsWrappers>
  );
}
