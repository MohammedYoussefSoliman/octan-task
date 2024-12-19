import { useTranslation } from 'react-i18next';

import { Flex } from '@/components/Grids';
import UserInfo from '@/components/UserInfo';
import { useAppSelector } from '@/hooks';

import ToggleLanguage from './ToggleLanguage';

type Props = {
  transparentMode: boolean;
};

export default function LoggedUser({ transparentMode }: Props) {
  const user = useAppSelector((state) => state.consumerAuth.user);
  const language = useAppSelector((state) => state.ui.language);
  const customerName = user.customer_names[language];
  const { t } = useTranslation('app');

  const firstName = customerName?.firstName?.trim() || t('newUserFirstName');
  const lastName = customerName?.lastName?.trim() || t('newUserLastName');

  return (
    <Flex align="center" gap="24px" fullHeight>
      <ToggleLanguage transparentMode={transparentMode} />
      <UserInfo
        firstName={firstName}
        lastName={lastName}
        image={user.avatar}
        transparentMode={transparentMode}
      />
    </Flex>
  );
}
