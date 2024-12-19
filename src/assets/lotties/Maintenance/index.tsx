import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
};

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

export default function Maintenance({ size }: LottiePropsType) {
  const heightCoefficient = 0.56;
  const height = size ? calculateProperty(size, heightCoefficient) : 420;
  const width = size || 591;
  return (
    <Lottie
      options={{
        animationData: animation,
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      width={width}
      height={height}
    />
  );
}
