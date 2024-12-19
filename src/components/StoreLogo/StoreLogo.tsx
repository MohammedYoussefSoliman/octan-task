import { Link } from '@/components';

import { Image } from './StoreLogo.styles';
import { StoreLogoProps } from './StoreLogo.types';

function StoreLogo({ image, url, alt }: StoreLogoProps) {
  return (
    <Link to={url} relative={false}>
      <Image src={image} alt={alt || 'store logo'} />
    </Link>
  );
}

export default StoreLogo;
