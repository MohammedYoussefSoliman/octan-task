import React from 'react';

export type TabsType = {
  defaultValue?: number | string;
  children: React.ReactNode;
};
export type TabType = {
  label: string;
  value: number | string;
};

export type PanelType = {
  label: string;
  value: string;
  children: React.ReactNode;
};
