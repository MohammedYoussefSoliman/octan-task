import { useTheme } from '@emotion/react';

import { Flex, Icon, Link } from '@/components';
import socialMediaList, { SocialMedia } from '@/helpers/socialMediaList';

import SocialPill from './styles';

type SocialBarProps = {
  filter?: SocialMedia['name'][];
  spaceBetweenSize?: 'sparse' | 'dense';
  size?: 'sm' | 'md' | 'lg';
};

export function SocialBar({
  filter = ['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'email'],
  spaceBetweenSize = 'sparse',
  size = 'md',
}: SocialBarProps) {
  // const { get } = useAxiosInstance();
  // const [socialMediaList, setsSocialMediaList] = React.useState<
  //   SocialMedia[] | null
  // >(null);
  // const getSocialMediaLinks = React.useCallback(async () => {
  //   const {
  //     data: { records },
  //   } = await get("social-media");
  //   setsSocialMediaList(records as SocialMedia[]);
  // }, [get]);

  // React.useEffect(() => {
  //   getSocialMediaLinks();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const gaps = {
    sparse: { xs: 7, md: 15, lg: 30 },
    dense: size === 'sm' ? { xs: 2, md: 4 } : { xs: 4, md: 8, lg: 12 },
  };

  const { pallet } = useTheme();

  return (
    <Flex gap={gaps[spaceBetweenSize]} align="center" withWrap>
      {socialMediaList &&
        socialMediaList
          .filter((item) => filter.includes(item.name))
          .map((item) => (
            <Link key={item.url} to={item.url} relative={false}>
              <SocialPill align="center" justify="center">
                <Icon
                  name={item.name.toLowerCase() as SocialMedia['name']}
                  size={20}
                  color={pallet.primary[1000]}
                />
              </SocialPill>
            </Link>
          ))}
    </Flex>
  );
}
