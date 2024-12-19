import EmptyLayout from './empty';
import NoFooter from './NoFooter';
import NormalLayout from './normal';
import SmallFooter from './SmallFooter';
import SmallFooterNoHeader from './SmallFooterNoHeader';
import { Layouts } from './types';
export { default as EmptyLayout } from './empty';
export { default as NoFooter } from './NoFooter';
export { default as NormalLayout } from './normal';
export { default as SmallFooter } from './SmallFooter';
export { default as SmallFooterNoHeader } from './SmallFooterNoHeader';

export const layouts: Layouts = {
  empty: EmptyLayout,
  'no-footer': NoFooter,
  normal: NormalLayout,
  'small-footer': SmallFooter,
  'small-footer-no-header': SmallFooterNoHeader,
};
