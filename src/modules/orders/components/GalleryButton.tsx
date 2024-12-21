import React from 'react';

import { useTheme } from '@emotion/react';

import { IconButton, Gallery, Flex, Modal, Icon, H2, H6 } from '@/components';

import { GalleryCountWrapper, StyledGalleryButton } from './styles';

type Attachment = {
  attachment: string;
  type: 'image' | 'video';
};

type Props = {
  attachments: Attachment[];
};

export default function GalleryButton({ attachments }: Props) {
  const theme = useTheme();

  const [openGallery, setOpenGallery] = React.useState<boolean>(false);

  const thumb = attachments.find((attach) => attach.type === 'image');
  return (
    <>
      <StyledGalleryButton onClick={() => setOpenGallery(true)} type="button">
        {thumb ? (
          <img src={thumb.attachment} alt="thumb_img" />
        ) : (
          <Icon name="grey-logo-shape" size={50} />
        )}
        <GalleryCountWrapper align="center" justify="center">
          <H2 text={`${attachments.length}`} color={theme.pallet.text.white} />
        </GalleryCountWrapper>
      </StyledGalleryButton>
      <Modal open={openGallery} onClose={() => setOpenGallery(false)}>
        <Flex direction="column" gap="16px" fullWidth align="center">
          <Flex justify="space-between" fullWidth>
            <H6 text="showCustomerAttachments" />
            <IconButton
              size="sm"
              icon="times"
              variant="secondary"
              onClick={() => setOpenGallery(false)}
            />
          </Flex>
          <Gallery attachments={attachments} />
        </Flex>
      </Modal>
    </>
  );
}
