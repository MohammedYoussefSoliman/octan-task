import AcceptedStatus from './AcceptedStatus';
import RejectedStatus from './RejectedStatus';

type ItemStatus = {
  status: 'pending' | 'accepted' | 'rejected';
  feedback: string;
};

type Props = {
  statusInfo: ItemStatus;
};

const statuses = {
  accepted: AcceptedStatus,
  rejected: RejectedStatus,
};

export default function OrderItemStatus({ statusInfo }: Props) {
  if (!statusInfo.feedback || statusInfo.status === 'pending') {
    return null;
  }

  const Content = statuses[statusInfo.status];

  return <Content reason={statusInfo.feedback} />;
}
