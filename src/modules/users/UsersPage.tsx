import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import {
  Table,
  Typography,
  DeleteItem,
  ViewDetails,
  InfoItem,
} from '@/components';
import { HTTPResponseType, User } from '@/types/common.types';

import UpdateStatus from './components/UpdateStatus';

import { Template } from '@/layouts';

export default function OrdersPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const response = await axios.get<HTTPResponseType<User[]>>(
        'http://localhost:8000/users',
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
              header: 'name',
              accessor: 'username',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value}
                </Typography>
              ),
            },
            {
              header: 'email address',
              accessor: 'email',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value}
                </Typography>
              ),
            },
            {
              header: 'role',
              accessor: 'role',
              formatter: ({ value }) => (
                <Typography as="p2" className="text-neutral-600">
                  {value}
                </Typography>
              ),
            },
            {
              header: 'status',
              accessor: 'active',
              formatter: ({ data }) => <UpdateStatus user={data} />,
            },
            {
              header: '',
              accessor: 'id',
              formatter: ({ value, data }) => (
                <div className="flex gap-2">
                  <ViewDetails title="user details">
                    <InfoItem label="User ID">{data.id}</InfoItem>
                    <InfoItem label="username">{data.username}</InfoItem>
                    <InfoItem label="Email Address">{data.email}</InfoItem>
                    <InfoItem label="Role">{data.role}</InfoItem>
                    <InfoItem label="user status">
                      {data.active ? (
                        <Typography as="p1" className="text-green-600">
                          active
                        </Typography>
                      ) : (
                        <Typography as="p2" className="text-neutral-600">
                          inactive
                        </Typography>
                      )}
                    </InfoItem>
                  </ViewDetails>
                  <DeleteItem
                    endpoint="users"
                    id={value}
                    queryKey={['users']}
                    successMessage={`users ${value} deleted`}
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
