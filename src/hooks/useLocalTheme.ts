import { useAppSelector } from '@/hooks';
import getTheme from '@/theme';

const useLocalTheme = () => {
  const brandingDetails = useAppSelector((state) => state.ui.brandingDetails);

  return { ...getTheme('light'), branding: brandingDetails };
};

export default useLocalTheme;
