'use client';

import axios from 'axios';
import useSWR from 'swr';
import { AuctionPlaceholder } from './auction-placeholder';
import { Pagination } from './pagination';
import { useState } from 'react';
import { Auction, PageResult } from '@/types';
import { AuctionCard } from './auction-card';
import { Button } from './ui/button';
import { useParamsStore } from '@/stores/useParamsStore';
import { shallow } from 'zustand/shallow';

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data) as Promise<PageResult<Auction>>;

export function AuctionListings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const params = useParamsStore(
    (state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
    }),
    shallow
  );

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/search?pageSize=${pageSize}&pageNumber=${currentPage}`,
    fetcher
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handlePageSize = (pageSize: number) => {
    setPageSize(pageSize);
  };

  if (error) return <AuctionPlaceholder />;

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Auctions</h1>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {data?.results.map((auction, i) => (
          <AuctionCard auction={auction} key={auction.id} index={i} />
        ))}
      </div>
      <div className="p-3 mt-2">
        <div className="flex justify-end gap-2">
          <Button variant="outline" value={2} onClick={() => handlePageSize(2)}>
            2
          </Button>
          <Button variant="outline" value={4} onClick={() => handlePageSize(4)}>
            4
          </Button>
          <Button variant="outline" value={6} onClick={() => handlePageSize(6)}>
            6
          </Button>
        </div>
        <Pagination
          currentPage={currentPage}
          pageCount={data?.pageCount || 0}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
