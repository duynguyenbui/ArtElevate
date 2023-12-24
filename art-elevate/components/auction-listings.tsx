'use client';

import useSWR from 'swr';
import { AuctionCard } from './auction-card';
import { useParamsStore } from '@/hooks/use-params-store';
import qs from 'query-string';
import { PaginationApp } from './pagination';
import { fetchAuctions } from '@/actions/auction-actions';

export function AuctionListings() {
  const { searchParams, setPageNumber } = useParamsStore();

  const url = qs.stringifyUrl({
    url: `${process.env.NEXT_PUBLIC_API_SERVER_URL}/search`,
    query: {
      pageNumber: searchParams.pageNumber,
      searchTerm: searchParams.searchTerm,
      pageSize: 7,
    },
  });

  const { data } = useSWR(url, fetchAuctions);

  return (
    <div className="flex flex-col">
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
      <PaginationApp
        currentPage={searchParams.pageNumber || 1}
        pageCount={data?.pageCount || 0}
        onPageChange={setPageNumber}
      />
    </div>
  );
}
