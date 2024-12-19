import images from '@/assets/images';
import { Link } from '@/components/Links';

import { Image, WhatsappWrapper } from './WhatsappLink.styles';

const { WHATSAPP_LOGO } = images;

export default function WhatsappLink() {
  return (
    <WhatsappWrapper>
      <Link
        to="https://api.whatsapp.com/send/?phone=%2B966553562993"
        relative={false}
      >
        <Image src={WHATSAPP_LOGO} alt="whatsapp logo" />
      </Link>
    </WhatsappWrapper>
  );
}
