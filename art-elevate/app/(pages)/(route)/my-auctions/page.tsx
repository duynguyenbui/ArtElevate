import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { getAuctionsBySeller } from '@/actions/auction-actions';
import { getCurrentUser } from '@/actions/auth-action';

const MyAuctionsPage = async () => {
  const session = await getCurrentUser();
  if (session?.username) {
    const data = await getAuctionsBySeller(session.username);
    return (
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    );
  }
};

export default MyAuctionsPage;
