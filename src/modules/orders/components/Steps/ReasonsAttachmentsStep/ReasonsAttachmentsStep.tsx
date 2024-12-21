import loGet from 'lodash/get';

import { useAppSelector } from '@/hooks';

import CancellationJourney from './CancellationJourneyReasons';
import NormalReasonsAttachmentsStep from './NormalReasonsAttachmentsStep';

export default function ReasonsAttachmentsStep() {
  const { order } = useAppSelector((state) => state.consumerOrder);

  const isCancellation = loGet(order, 'is_cancellation');

  if (isCancellation) return <CancellationJourney />;

  return <NormalReasonsAttachmentsStep />;
}
