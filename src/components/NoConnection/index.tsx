import { NoConnection as NoConnectionLottie } from '@/assets/lotties';
import { Flex } from '@/components';
import { useBreakpoints } from '@/hooks';

export default function NoConnection() {
  const { hd, xLarge, large, medium, small } = useBreakpoints();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      fullWidth
      height="100vh"
    >
      <NoConnectionLottie
        size={
          hd
            ? 960
            : xLarge
              ? 768
              : large
                ? 560
                : medium
                  ? 420
                  : small
                    ? 300
                    : 250
        }
      />
    </Flex>
  );
}
