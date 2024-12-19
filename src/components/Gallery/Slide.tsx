import React from 'react';

import ReactPlayer from 'react-player';
import { useSwiperSlide } from 'swiper/react';

import { ImageWrapper, Image } from './Gallery.styles';

type Props = {
  source: { attachment: string; type: 'image' | 'video' };
};

export default function Slide({ source }: Props) {
  const { isActive } = useSwiperSlide();

  const [playVideo, setPlayVideo] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isActive) {
      setPlayVideo(false);
    }
  }, [isActive]);
  return (
    <ImageWrapper align="center" justify="center">
      {source.type === 'video' ? (
        <ReactPlayer
          playing={playVideo}
          url={source.attachment}
          controls
          onPlay={() => {
            setPlayVideo(true);
          }}
          stopOnUnmount
        />
      ) : (
        <Image src={source.attachment} alt="slide" />
      )}
    </ImageWrapper>
  );
}
