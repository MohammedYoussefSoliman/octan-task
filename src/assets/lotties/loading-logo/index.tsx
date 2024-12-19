import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
  speed?: number;
};

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

export default function LoadingLogo({ size, speed }: LottiePropsType) {
  const heightCoefficient = 0.7896;
  const height = size ? calculateProperty(size, heightCoefficient) : 181;

  return (
    <Lottie
      style={{ margin: 0, background: 'transparent' }}
      options={{
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      width={size || 230}
      height={height}
      speed={speed}
    />
  );
}
