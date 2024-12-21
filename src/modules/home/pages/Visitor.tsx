import React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { changeHeaderVariant } from '@/state';

// import { setFormItems } from "state/order/slice";
import VisitorHome from '../visitorHome';

export default function Visitor() {
  const dispatch = useAppDispatch();

  const { nafathVerificationStatus } = useAppSelector(
    (state) => state.consumerAuth,
  );

  React.useEffect(() => {
    dispatch(changeHeaderVariant('transparent'));
    // dispatch(setFormItems({ items: [] }));
  }, [dispatch]);

  if (nafathVerificationStatus === 'required') return null;

  return <VisitorHome />;
}
