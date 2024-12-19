import React from 'react';

import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';

import { Flex, Icon } from '@/components';

import {
  Wrapper,
  NavigationWrapper,
  GalleryButtonWrapper,
  GalleryButton,
  Image,
} from './Gallery.styles';
import NavigationButton from './NavigationButton';
import Slide from './Slide';

type GalleryProps = {
  attachments: { attachment: string; type: 'image' | 'video' }[];
};

export default function Gallery({ attachments }: GalleryProps) {
  const [swiper, setSwiper] = React.useState<Swiper | null>(null);

  return (
    <Flex gap={{ xs: 16 }} direction={{ xs: 'column', md: 'row' }} fullWidth>
      <Wrapper width={{ xs: '100%', md: '80%' }} justify="center">
        <NavigationWrapper>
          {swiper && (
            <NavigationButton
              swiper={swiper}
              direction="right"
              className="next--button"
            />
          )}
          {swiper && (
            <NavigationButton
              swiper={swiper}
              direction="left"
              className="back--button"
            />
          )}
        </NavigationWrapper>
        <ReactSwiper
          spaceBetween={80}
          slidesPerView={1}
          modules={[Navigation]}
          loop
          onSwiper={(currentSwiper) => setSwiper(currentSwiper)}
        >
          {attachments.map((attach) => (
            <SwiperSlide key={attach.attachment}>
              <Slide source={attach} />
            </SwiperSlide>
          ))}
        </ReactSwiper>
      </Wrapper>
      <Flex flex={1} width={{ xs: '100%', md: 'fit-content' }}>
        <GalleryButtonWrapper>
          {attachments.map((file, index) => (
            <GalleryButton
              onClick={() => {
                if (swiper) {
                  swiper.slideToLoop(index);
                }
              }}
              key={file.attachment}
            >
              {file.type === 'image' ? (
                <Image src={file.attachment} />
              ) : (
                <Flex justify="center" align="center" fullHeight fullWidth>
                  <Icon name="youtube" />
                </Flex>
              )}
            </GalleryButton>
          ))}
        </GalleryButtonWrapper>
      </Flex>
    </Flex>
  );
}
