import { AxiosResponse } from 'axios';

import data from './business-sample.json';
import icon_1 from './icons/icon_1.png';
import icon_2 from './icons/icon_2.png';
import icon_3 from './icons/icon_3.png';
import icon_4 from './icons/icon_4.png';
import icon_5 from './icons/icon_5.png';
import icon_6 from './icons/icon_6.png';
import trusted_by_1 from './trusted_by_1.svg';
import trusted_by_2 from './trusted_by_2.svg';
import trusted_by_3 from './trusted_by_3.svg';
import trusted_by_4 from './trusted_by_4.svg';

const images = {
  trusted_by_1,
  trusted_by_2,
  trusted_by_3,
  trusted_by_4,
};

const icons = {
  icon_1,
  icon_2,
  icon_3,
  icon_4,
  icon_5,
  icon_6,
};

type LogoType =
  | 'trusted_by_1'
  | 'trusted_by_2'
  | 'trusted_by_3'
  | 'trusted_by_4';

type IconType = 'icon_1' | 'icon_2';

export default async function fetchBusinessRecords(): Promise<AxiosResponse> {
  const myPromise = new Promise((resolve, reject) => {
    if (data) {
      setTimeout(() => {
        const dataTrustedBy = data.trustedBy;
        const dataAdvantages = data.advantages;
        const trustedByLogos = dataTrustedBy.logos.map(
          (logo) => images[logo as LogoType],
        );
        const advantagesRecords = dataAdvantages.records.map((record) => ({
          ...record,
          icon: icons[record.icon as IconType],
        }));
        const trustedBy = { ...dataTrustedBy, logos: trustedByLogos };
        const advantages = {
          title: data.advantages.title,
          records: advantagesRecords,
        };

        resolve({ ...data, trustedBy, advantages });
      }, 2000);
    } else {
      reject(new Error('Unable to fetch data'));
    }
  });

  return myPromise as Promise<AxiosResponse>;
}
