import { Maintenance as MaintenanceLottie } from '@/assets/lotties';
import { Flex } from '@/components';
import { H4, P1 } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';

export default function Maintenance() {
  const { hd, xLarge, large, medium, small } = useBreakpoints();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      fullHeight
      fullWidth
    >
      <MaintenanceLottie
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
      <H4 text="maintenanceHeader" textAlign="left" />
      <P1 text="maintenancePragraph" textAlign="left" />
    </Flex>
  );
}
