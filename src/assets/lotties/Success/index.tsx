import Lottie from 'react-lottie';

import animation from './animation.json';

type LottiePropsType = {
  size?: number;
};

export default function Success({ size }: LottiePropsType) {
  return (
    <Lottie
      style={{ margin: 0 }}
      options={{
        loop: false,
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
