import { SVGprop } from './types';

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

function LogoShapePurple({ size }: SVGprop) {
  const heightCoefficient = 0.936;
  const height = size ? calculateProperty(size, heightCoefficient) : 117;

  return (
    <svg
      width={size || '100'}
      height={height}
      viewBox="0 0 102 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100.19 31.2111L85.0884 80.4356C81.7415 91.3744 69.9864 97.6601 58.966 94.3131L48.5986 91.1295C39.619 88.354 33.7415 80.0274 33.8231 70.9662C36.1905 70.8029 38.5578 70.2315 40.8435 69.007L53.7415 62.1499C61.9864 57.7417 65.17 47.5376 60.7619 39.2927L49.3333 17.7417L49.9047 15.7825C53.2517 4.76212 65.0068 -1.44196 76.0272 1.90498L86.3945 5.08865C97.3333 8.51722 103.619 20.1907 100.19 31.2111Z"
        fill="#F8F4FF"
      />
      <path
        opacity="0.88"
        d="M53.8236 62.2314L40.9257 69.0885C38.7216 70.313 36.2726 70.8845 33.9053 71.0477C33.9053 69.0885 34.2318 67.0477 34.8032 65.0885L49.2522 17.8232L60.6808 39.3743C65.1706 47.6192 62.0685 57.8232 53.8236 62.2314Z"
        fill="#C7B7E6"
      />
      <path
        opacity="0.79"
        d="M49.3335 17.7417L34.8846 65.007C34.3131 66.9662 33.9866 69.007 33.9866 70.9662C27.6192 71.2927 21.2519 68.0274 18.0682 61.9866L1.98659 31.7009C-2.42157 23.456 0.762106 13.2519 9.007 8.84374L21.905 1.98659C30.1499 -2.42157 40.4356 0.762109 44.7621 9.00701L49.3335 17.7417Z"
        fill="#9E6CFF"
      />
    </svg>
  );
}

export default LogoShapePurple;
