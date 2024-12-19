import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
};

const calculateProperty = (size: number, coefficient: number) =>
  size * coefficient;

export default function AccessDenied({ size }: LottiePropsType) {
  const heightCoefficient = 0.7896;
  const height = size ? calculateProperty(size, heightCoefficient) : 181;

  return (
    <Lottie
      style={{ margin: 0 }}
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
    />
  );
}
