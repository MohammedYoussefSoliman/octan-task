import TextElement from './Text';
import { TypographyProps, TypographicConfig } from './types';
import typographyConfig from './typographyConfig';
import withTypographicConfig from './withTypographicConfig';

export function Typography(Props: TypographyProps) {
  return <TextElement as="span" {...Props} />;
}

export const H1 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h1,
);
export const H2 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h2,
);
export const H3 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h3,
);
export const H4 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h4,
);
export const H5 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h5,
);
export const H6 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.h6,
);
export const P1 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.p1,
);
export const P2 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.p2,
);
export const P3 = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.p3,
);
export const Small = withTypographicConfig<TypographyProps, TypographicConfig>(
  TextElement,
  typographyConfig.small,
);
