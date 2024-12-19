import { useTheme } from '@emotion/react';

import { IconButton } from '@/components/Buttons';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleLanguage } from '@/state/ui/slice';

type Props = {
  transparentMode: boolean;
};

export default function ToggleLanguage({ transparentMode }: Props) {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector((state) => state.ui);
  const { colors } = useTheme();

  return (
    <IconButton
      onClick={() => dispatch(toggleLanguage(language === 'en' ? 'ar' : 'en'))}
      icon={language === 'en' ? 'language-ltr' : 'language-rtl'}
      variant="secondary"
      color={transparentMode ? colors.shades[100] : undefined}
    />
  );
}
