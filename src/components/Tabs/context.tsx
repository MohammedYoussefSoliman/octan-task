import React from 'react';

import { TabType, TabsType } from './types';

interface AppContextInterface {
  updateHeaders: (tab: TabType) => void;
  tabs: TabType[];
  updateActiveTab: (value: number | string) => void;
  activeTab: number | string;
}

export const TabsStore = React.createContext<AppContextInterface>({
  tabs: [],
  updateHeaders: () => {},
  updateActiveTab: () => {},
  activeTab: '',
});

export default function Tabs({ children, defaultValue }: TabsType) {
  const [tabs, setTabs] = React.useState<TabType[]>([]);
  const [activeTab, setActiveTab] = React.useState<number | string>(
    defaultValue || '',
  );

  const updateHeaders = (tab: TabType) => {
    setTabs((currentTabs) => {
      const foundTab = currentTabs.find((t) => t.label === tab.label);
      if (foundTab) return currentTabs;
      return [...currentTabs, tab];
    });
  };

  const updateActiveTab = (value: number | string) => {
    setActiveTab(value);
  };

  const contextValues = React.useMemo(
    () => ({
      tabs,
      updateHeaders,
      updateActiveTab,
      activeTab,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeTab, tabs, setTabs],
  );

  return (
    <TabsStore.Provider value={contextValues}>{children}</TabsStore.Provider>
  );
}
