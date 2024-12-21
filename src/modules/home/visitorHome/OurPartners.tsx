import { useTranslation } from 'react-i18next';

import { Flex, H5 } from '@/components';

import { Image } from '../styles';

type Partner = {
  name: string;
  logo: string;
  url: string;
  width?: number;
};

const partners: Partner[] = [
  {
    name: 'Alamoudi Oud',
    logo: '/partners/alamoudi.webp',
    url: 'https://oudamoudi.com',
  },
  {
    name: 'Barllina',
    logo: '/partners/barlina.png',
    url: 'https://barllina.com',
  },
  {
    name: 'Neyam',
    logo: '/partners/neyam.png',
    url: 'https://neyam.san',
    width: 110,
  },
  {
    name: 'Dkhoon Alemiratia',
    logo: '/partners/dkhoon.png',
    url: 'https://dkhoonemirates.com',
    width: 210,
  },
  {
    name: 'Top Tato',
    logo: '/partners/toptato.png',
    url: 'https://toptato.com',
  },
  {
    name: 'Rashof Natural Honey',
    logo: '/partners/rashof.svg',
    url: 'https://rashof.com/',
  },
  {
    name: 'Sayyar',
    logo: '/partners/sayyar.png',
    url: 'https://sayyar.com',
  },
];

function OurPartners() {
  const { t } = useTranslation();

  return (
    <Flex
      p={{ xs: 16, md: 42 }}
      gap={48}
      align="center"
      direction="column"
      fullWidth
    >
      <H5 textAlign="center">{t('ourProudPartners')}</H5>
      <Flex
        direction="column"
        gap={{ xs: 24, md: 48 }}
        p={{ xs: 10, md: 28 }}
        fullWidth
      >
        <Flex
          withWrap
          justify="center"
          align="center"
          gap={{ xs: 36, md: 60, lg: 80 }}
          maxWidth={1000}
          mh="auto"
          fullWidth
        >
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width || 180}
              />
            </a>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default OurPartners;
