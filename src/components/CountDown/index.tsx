import React from 'react';

import { useTheme } from '@emotion/react';

import { Flex, Progress, Typography } from '@/components';

type CountDownProps = {
  onFinish?: () => void;
  time?: number;
  withProgress?: boolean;
  reset?: boolean;
};

export function CountDown({
  onFinish,
  time,
  withProgress,
  reset,
}: CountDownProps) {
  const currentTime = time || 10;
  const [remainingTime, setRemainingTime] = React.useState(currentTime);
  const { pallet } = useTheme();
  // start counter
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        if (onFinish) onFinish();
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [onFinish, remainingTime]);

  React.useEffect(() => {
    if (reset) setRemainingTime(time || 10);
  }, [reset, time]);

  const readableTime = {
    minutes: Math.floor(remainingTime / 60),
    seconds: Math.floor(remainingTime % 60),
  };

  if (remainingTime === 0) return null;

  return (
    <Flex gap={{ xs: 6, md: 8, lg: 16 }} align="center">
      {withProgress && (
        <Progress value={+((remainingTime / currentTime) * 100).toFixed(0)} />
      )}
      <Typography
        text={`${readableTime.minutes < 10 ? '0' : ''}${readableTime.minutes}:${
          readableTime.seconds < 10 ? '0' : ''
        }${readableTime.seconds}`}
        color={pallet.text.heading}
        fontSize="18px"
        noTrans
      />
    </Flex>
  );
}
