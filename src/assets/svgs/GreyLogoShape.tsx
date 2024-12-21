import { SVGprop } from './types';

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

function GreyLogoShape({ size }: SVGprop) {
  const heightCoefficient = 0.944;
  const height = size ? calculateProperty(size, heightCoefficient) : 118;

  return (
    <svg
      width={size || '125'}
      height={height}
      viewBox="0 0 125 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M123.6 38.6999L105.1 98.9999C101 112.4 86.6001 120.1 73.1001 116L60.4001 112.1C49.4001 108.7 42.2001 98.4999 42.3001 87.3999C45.2001 87.1999 48.1001 86.4999 50.9001 84.9999L66.7001 76.5999C76.8001 71.1999 80.7001 58.6999 75.3001 48.5999L61.3001 22.1999L62.0001 19.7999C66.1001 6.2999 80.5001 -1.3001 94.0001 2.7999L106.7 6.69989C120.1 10.8999 127.8 25.1999 123.6 38.6999Z"
        fill="#F5F5F5"
      />
      <path
        opacity="0.88"
        d="M66.8001 76.6999L51.0001 85.0999C48.3001 86.5999 45.3001 87.2999 42.4001 87.4999C42.4001 85.0999 42.8001 82.5999 43.5001 80.1999L61.2001 22.2999L75.2001 48.6999C80.7001 58.7999 76.9001 71.2999 66.8001 76.6999Z"
        fill="#E9E9E9"
      />
      <path
        opacity="0.79"
        d="M61.3 22.1999L43.6 80.0999C42.9 82.4999 42.5 84.9999 42.5 87.3999C34.7 87.7999 26.9 83.7999 23 76.3999L3.30003 39.2999C-2.09997 29.1999 1.80004 16.6999 11.9 11.2999L27.7 2.89989C37.8 -2.50011 50.4 1.39989 55.7 11.4999L61.3 22.1999Z"
        fill="#D6D6D6"
      />
    </svg>
  );
}

export default GreyLogoShape;
