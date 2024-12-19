import { Flex, H3, P2 } from '@/components';

export default function FormHeader() {
  return (
    <Flex gap={{ xs: 6, md: 8 }} direction="column">
      <H3 text="login" capitalizeFirstLetter />
      <P2 text="loginNow" capitalizeFirstLetter />
    </Flex>
  );
}
