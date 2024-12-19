import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
};

export default function Refund({ size }: LottiePropsType) {
  const lottieSize = size || 400;

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
      width={lottieSize}
      height={lottieSize}
    />
  );
}
