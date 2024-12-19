import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
};

export default function Error({ size }: LottiePropsType) {
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
      width={size || 400}
      height={size || 400}
    />
  );
}
