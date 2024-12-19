import { Logo, Flex, Link, Small } from '@/components';

function PoweredByYamm({ color }: { color?: string }) {
  return (
    <Flex
      align="center"
      justify="center"
      gap={{
        xs: 6,
      }}
      mt={{ xs: 24 }}
      fullWidth
    >
      <Small weight={500} text="poweredBy" color={color} />
      <Link to="https://yamm.sa" relative={false}>
        <Logo size={72} />
      </Link>
    </Flex>
  );
}

export default PoweredByYamm;
