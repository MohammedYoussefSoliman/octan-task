import React from 'react';

export default function withTypographicConfig<
  Props,
  Injects extends keyof Props,
>(Component: React.ComponentType<Props>, configs: Pick<Props, Injects>) {
  return function ConfiguredComponent(props: Props) {
    return <Component {...configs} {...props} />;
  };
}
