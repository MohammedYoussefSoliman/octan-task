import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Button, InfoItem, Status } from '@/components';
import { Order } from '@/types/common.types';

import { Template } from '@/layout';

export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['orders', id],
    queryFn: async () => {
      const response = await axios.get<Order>(
        `http://localhost:8000/orders/${id}`,
      );
      return response.data;
    },
  });

  if (isError)
    return (
      <div className="w-full h-[60vh] flex flex-col justify-center items-center">
        error happened
      </div>
    );
  if (isLoading || isFetching)
    return (
      <div className="w-full h-[60vh] flex flex-col justify-center items-center">
        loading user data
      </div>
    );

  return (
    <Template title={`Order: ${id}`}>
      <div className="p-4 gap-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
          <InfoItem label="Order ID">{data.id}</InfoItem>
          <InfoItem label="Customer Name">{data.customerName}</InfoItem>
          <InfoItem label="Status">
            <Status status={data.status} />
          </InfoItem>
          <InfoItem label="Total Amount">
            {' '}
            {moment(data.date).format('DD-MM-YYYY')}
          </InfoItem>
          <InfoItem label="Order Date">
            {data.total} {'EGP'}
          </InfoItem>
        </div>
        <Button
          size="sm"
          variant="light"
          className="ms-auto"
          prefixIcon="ChevronLeft"
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </div>
    </Template>
  );
}
