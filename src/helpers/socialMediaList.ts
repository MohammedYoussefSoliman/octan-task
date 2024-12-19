export type SocialMedia = {
  name: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'email';
  url: string;
};

const socialMediaList: SocialMedia[] = [
  {
    name: 'instagram',
    url: 'https://instagram.com/tryyamm.sa',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/tryyamm',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/company/tryyamm',
  },
  {
    name: 'youtube',
    url: 'https://www.youtube.com/@tryYamm/videos',
  },
  {
    name: 'email',
    url: 'mailto:info@yamm.sa',
  },
];

export default socialMediaList;
