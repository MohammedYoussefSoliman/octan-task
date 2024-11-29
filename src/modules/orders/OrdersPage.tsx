import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import {
  Status,
  Table,
  Typography,
  DeleteItem,
  IconButton,
} from '@/components';
import { HTTPResponseType, Order } from '@/types/common.types';

import UpdateStatus from './components/UpdateStatus';

import { Template } from '@/layout';

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', page],
    queryFn: async () => {
      const response = await axios.get<HTTPResponseType<Order[]>>(
        'http://localhost:8000/orders',
        {
          params: {
            _page: page,
            _per_page: 10,
          },
        },
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

  return (
    <Template title="Orders">
      <div className="flex flex-col gap-2 w-full">
        <Table
          tableData={data?.data || []}
          isLoading={isLoading}
          pagination={
            data
              ? {
                  page,
                  setPage,
                  lastPage: data.last,
                }
              : null
          }
          columns={[
            {
              header: 'ID',
              accessor: 'id',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value}
                </Typography>
              ),
            },
            {
              header: 'Customer name',
              accessor: 'customerName',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value}
                </Typography>
              ),
            },
            {
              header: 'Order Date',
              accessor: 'date',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {moment(value).format('DD-MM-YYYY')}
                </Typography>
              ),
            },
            {
              header: 'Total',
              accessor: 'total',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value} {'EGP'}
                </Typography>
              ),
            },
            {
              header: 'Order Status',
              accessor: 'status',
              formatter: ({ value }) => <Status status={value} />,
            },
            {
              header: 'Update Status',
              accessor: 'status',
              formatter: ({ data }) => <UpdateStatus order={data} />,
            },
            {
              header: '',
              accessor: 'id',
              formatter: ({ value }) => (
                <div className="flex gap-2">
                  <IconButton
                    iconName="Eye"
                    onClick={() => navigate(`/${value}`)}
                  />
                  <DeleteItem
                    endpoint="orders"
                    id={value}
                    queryKey={['orders']}
                    successMessage={`Order ${value} deleted`}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
    </Template>
  );
}
