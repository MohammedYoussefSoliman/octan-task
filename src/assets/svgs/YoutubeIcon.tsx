import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function YoutubeIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.4991 6.62768C23.3625 6.11885 23.0946 5.65483 22.7223 5.28206C22.35 4.90929 21.8863 4.64084 21.3777 4.50357C19.5054 4 12 4 12 4C12 4 4.49464 4 2.62232 4.50089C2.11345 4.63771 1.64953 4.90601 1.27716 5.27886C0.904787 5.6517 0.637069 6.11595 0.500893 6.625C-1.02179e-07 8.5 0 12.4107 0 12.4107C0 12.4107 -1.02179e-07 16.3214 0.500893 18.1938C0.776786 19.2277 1.59107 20.042 2.62232 20.3179C4.49464 20.8214 12 20.8214 12 20.8214C12 20.8214 19.5054 20.8214 21.3777 20.3179C22.4116 20.042 23.2232 19.2277 23.4991 18.1938C24 16.3214 24 12.4107 24 12.4107C24 12.4107 24 8.5 23.4991 6.62768ZM9.61607 16V8.82143L15.8304 12.3839L9.61607 16Z"
        fill={color || theme.pallet.primary[800]}
      />
    </svg>
  );
}

export default YoutubeIcon;
