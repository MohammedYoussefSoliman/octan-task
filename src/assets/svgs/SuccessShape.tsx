import { SVGprop } from './types';

function SuccessShape({ size }: SVGprop) {
  return (
    <svg
      width={size || '77'}
      height={size || '77'}
      viewBox="0 0 77 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 0V0.0773869V7.81608C59.0712 9.90553 71.1649 25.3442 69.065 42.3307C67.2762 56.4151 56.1547 67.5975 42 69.2613V77C63.3876 74.8719 78.9422 55.9894 76.8034 34.708C75.0535 16.3286 60.3933 1.81859 42 0V0Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34 0C26.6829 0.722826 19.7036 3.57609 14 8.36957L19.3659 14C23.5685 10.5761 28.6341 8.36957 34 7.6087V0V0Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 14C3.65385 19.7036 0.769231 26.6454 0 34H7.69231C8.42308 28.6717 10.5769 23.606 14 19.3659L8.5 14V14Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51.8158 25L32.5526 43.8229L24.1842 35.6457L20 39.7343L32.5526 52L56 29.0886L51.8158 25V25Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 42C0.77135 49.7223 3.74105 57.0113 8.52342 63L14 57.3659C10.6061 52.9137 8.40771 47.5947 7.7135 42H0V42Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.3659 63L14 68.2837C19.666 73.1433 26.6454 76.1901 34 77V69.2865C28.6717 68.5923 23.606 66.3939 19.3659 63Z"
        fill="#34A853"
      />
    </svg>
  );
}

export default SuccessShape;
