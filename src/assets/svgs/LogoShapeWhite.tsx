import { SVGprop } from "./types";

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

function LogoShapeWhite({ size }: SVGprop) {
  const heightCoefficient = 0.936;
  const height = size ? calculateProperty(size, heightCoefficient) : 117;

  return (
    <svg
      width={size || "125"}
      height={height}
      viewBox="0 0 125 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M123.2 38.6999L104.7 98.9999C100.6 112.4 86.2001 120.1 72.7001 116L60.0001 112.1C49.0001 108.7 41.8001 98.4999 41.9001 87.3999C44.8001 87.1999 47.7001 86.4999 50.5001 84.9999L66.3001 76.5999C76.4001 71.1999 80.3001 58.6999 74.9001 48.5999L60.9001 22.1999L61.6001 19.7999C65.7001 6.2999 80.1001 -1.3001 93.6001 2.7999L106.3 6.69992C119.7 10.8999 127.4 25.1999 123.2 38.6999Z"
        fill="white"
      />
      <path
        d="M66.4001 76.6999L50.6001 84.9999C47.9001 86.4999 44.9001 87.1999 42.0001 87.3999C42.0001 84.9999 42.4001 82.4999 43.1001 80.0999L60.8001 22.1999L74.8001 48.5999C80.3001 58.7999 76.5001 71.2999 66.4001 76.6999Z"
        fill="#FF8389"
      />
      <path
        d="M60.9001 22.1999L43.2001 80.0999C42.5001 82.4999 42.1001 84.9999 42.1001 87.3999C34.3001 87.7999 26.5001 83.7999 22.6001 76.3999L2.90013 39.2999C-2.49987 29.1999 1.40013 16.6999 11.5001 11.2999L27.3001 2.89989C37.4001 -2.50011 50.0001 1.39987 55.3001 11.4999L60.9001 22.1999Z"
        fill="#FFCD2E"
      />
      <path
        d="M13.4001 107.2C12.5001 106.6 11.7001 105.9 11.2001 105C10.6001 104.1 10.4001 103 10.4001 101.9C10.4001 100.8 10.7001 99.7999 11.2001 98.7999C11.8001 97.8999 12.5001 97.0999 13.4001 96.5999C14.3001 95.9999 15.4001 95.7999 16.5001 95.7999C17.6001 95.7999 18.6001 96.0999 19.6001 96.5999C20.6001 97.0999 21.3001 97.8999 21.8001 98.7999C22.4001 99.6999 22.6001 100.8 22.6001 101.9C22.6001 103.3 22.2001 104.6 21.3001 105.7C21.0001 106.1 20.7001 106.4 20.3001 106.7C19.2001 107.6 17.9001 108 16.5001 108C15.4001 108.1 14.3001 107.8 13.4001 107.2ZM19.1001 106.4C19.9001 105.9 20.5001 105.3 21.0001 104.5C21.5001 103.7 21.7001 102.8 21.7001 101.9C21.7001 101 21.5001 100.1 21.0001 99.2999C20.5001 98.4999 19.9001 97.8999 19.1001 97.3999C18.3001 96.8999 17.5001 96.6999 16.5001 96.6999C15.6001 96.6999 14.7001 96.8999 13.9001 97.3999C13.1001 97.8999 12.5001 98.4999 12.0001 99.2999C11.5001 100.1 11.3001 101 11.3001 101.9C11.3001 102.8 11.5001 103.7 12.0001 104.5C12.5001 105.3 13.1001 105.9 13.9001 106.4C14.7001 106.9 15.5001 107.1 16.5001 107.1C17.4001 107.1 18.3001 106.9 19.1001 106.4ZM14.4001 104.7C14.3001 104.6 14.3001 104.6 14.3001 104.4V99.2999C14.3001 99.1999 14.3001 99.0999 14.4001 98.9999C14.5001 98.8999 14.5001 98.8999 14.7001 98.8999H16.7001C17.4001 98.8999 17.9001 98.9999 18.3001 99.2999C18.7001 99.5999 18.9002 100.1 18.9002 100.7C18.9002 101.1 18.8001 101.5 18.6001 101.8C18.4001 102.1 18.1001 102.3 17.8001 102.4L18.9002 104.1C18.9002 104.2 19.0001 104.2 19.0001 104.3C19.0001 104.4 19.0002 104.5 18.9002 104.5C18.8001 104.5 18.8001 104.6 18.6001 104.6H18.4001C18.2001 104.6 18.1001 104.5 17.9001 104.3L16.8001 102.5H15.4001V104.3C15.4001 104.4 15.4001 104.5 15.3001 104.6C15.2001 104.7 15.2001 104.7 15.0001 104.7H14.7001C14.6001 104.8 14.5001 104.8 14.4001 104.7ZM16.7001 101.7C17.5001 101.7 17.9001 101.4 17.9001 100.8C17.9001 100.2 17.5001 99.8999 16.7001 99.8999H15.3001V101.7H16.7001Z"
        fill="white"
      />
    </svg>
  );
}

export default LogoShapeWhite;