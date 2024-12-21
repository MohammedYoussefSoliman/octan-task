import { useTheme } from '@emotion/react';

import { SVGprop } from './types';

function AttachmentIcon({ size, color }: SVGprop) {
  const theme = useTheme();

  return (
    <svg
      width={size || '24'}
      height={size || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.92023 6.16758C8.48589 7.39932 6.74035 9.15177 4.55558 11.5609C4.27732 11.8678 3.80301 11.8909 3.49618 11.6127C3.18935 11.3344 3.16618 10.8601 3.44443 10.5533C5.64677 8.12475 7.44013 6.32017 8.94299 5.0296C10.439 3.74493 11.6898 2.93176 12.8085 2.53695C13.9624 2.12976 14.9673 2.17151 15.9078 2.56391C16.8042 2.93791 17.5938 3.6127 18.3712 4.35331L17.8539 4.89635L18.3712 4.35331C19.76 5.67631 20.8269 6.97817 20.7457 8.71378C20.668 10.3736 19.5407 12.2009 17.3892 14.6334L17.3866 14.6363C15.8098 16.4007 14.4964 17.718 13.3744 18.6655C12.2575 19.6087 11.294 20.2171 10.4154 20.5201C9.51004 20.8323 8.70348 20.8164 7.95358 20.5339C7.23641 20.2639 6.6271 19.7697 6.06635 19.2414C5.28723 18.5074 4.70726 17.7741 4.42674 16.9788C4.13388 16.1485 4.19351 15.3271 4.54667 14.4937C4.88725 13.6899 5.50099 12.8724 6.31608 11.9901C7.13664 11.1019 8.20463 10.1029 9.49923 8.94169L9.49923 8.94169C10.1129 8.39125 10.8529 7.75338 11.7008 7.52602C12.1528 7.40481 12.6345 7.39812 13.1327 7.56058C13.621 7.71982 14.0819 8.02719 14.5268 8.46612L14 9.00001L14.5268 8.46612C14.9426 8.87645 15.3252 9.34835 15.4623 9.9454C15.6056 10.5693 15.4502 11.1809 15.1165 11.8026C14.7888 12.413 14.2511 13.1047 13.5116 13.933C12.7661 14.7682 11.7814 15.7793 10.5303 17.0303C10.2374 17.3232 9.76257 17.3232 9.46968 17.0303C9.17678 16.7374 9.17678 16.2626 9.46968 15.9697C10.7187 14.7207 11.6775 13.7352 12.3926 12.9341C13.1139 12.1262 13.554 11.5418 13.7949 11.0931C14.0296 10.6558 14.0335 10.4255 14.0004 10.2811C13.9611 10.1099 13.8316 9.88741 13.4733 9.5339C13.1439 9.20898 12.8763 9.0547 12.6677 8.98668C12.4689 8.92188 12.2852 8.92232 12.0893 8.97484C11.6415 9.09493 11.1557 9.47091 10.5008 10.0583C9.21077 11.2154 8.18749 12.1749 7.41787 13.008C6.64277 13.8469 6.16743 14.5134 5.92778 15.0789C5.7007 15.6148 5.68895 16.0479 5.84132 16.4798C6.00601 16.9467 6.38788 17.4835 7.09496 18.1496L7.09497 18.1496C7.62064 18.6449 8.05274 18.9684 8.48223 19.1302C8.87899 19.2796 9.32434 19.3096 9.92638 19.102C10.5552 18.8851 11.3546 18.4078 12.4066 17.5195C13.453 16.6357 14.7137 15.3761 16.2669 13.6382C18.4254 11.1976 19.1967 9.72525 19.2473 8.64365C19.2944 7.63767 18.7191 6.75642 17.3366 5.43938C16.5685 4.70766 15.9503 4.20696 15.3303 3.94825C14.7543 3.70795 14.1342 3.6598 13.3077 3.95146C12.4462 4.25549 11.3615 4.92993 9.92023 6.16758Z"
        fill={color || theme.colors.dark[200]}
      />
    </svg>
  );
}

export default AttachmentIcon;
