import { AxiosResponse } from 'axios';

import store_logo_1 from './store_logo_1.png';
import store_logo_2 from './store_logo_2.png';
import store_logo_3 from './store_logo_3.png';
import data from './stores-sample.json';

const images = {
  store_logo_1,
  store_logo_2,
  store_logo_3,
};

type LogoType = 'store_logo_1' | 'store_logo_2' | 'store_logo_3';

export default async function fetchStores(): Promise<AxiosResponse> {
  const myPromise = new Promise((resolve, reject) => {
    if (data) {
      setTimeout(() => {
        resolve(
          data.map((item) => ({
            ...item,
            logo: images[item.logo as LogoType],
          })),
        );
      }, 2000);
    } else {
      reject(new Error('Unable to fetch data'));
    }
  });

  return myPromise as Promise<AxiosResponse>;
}
