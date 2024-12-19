import React from 'react';

export type LayoutType =
  | 'normal'
  | 'empty'
  | 'no-footer'
  | 'small-footer'
  | 'small-footer-no-header';

export type Layouts = {
  [key in LayoutType]: React.ComponentType<{ children: React.ReactNode }>;
};
