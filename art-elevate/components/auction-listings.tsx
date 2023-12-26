'use client';

import { AuctionCard } from './auction-card';
import { useParamsStore } from '@/hooks/use-params-store';
import qs from 'query-string';
import { PaginationApp } from './pagination';
import { fetchAuctions } from '@/actions/auction-actions';
import { useEffect, useState } from 'react';
import { Auction, PageResult } from '@/types';

export function AuctionListings() {
  const [pageResult, setPageResult] = useState<PageResult<Auction>>();
  const { searchParams, setPageNumber } = useParamsStore();

  const apiUrl =
    process.env.NODE_ENV === 'production'
      ? 'http://gateway-svc'
      : process.env.NEXT_PUBLIC_API_SERVER_URL;

  const url = qs.stringifyUrl({
    url: `${apiUrl}/search`,
    query: {
      pageNumber: searchParams.pageNumber,
      searchTerm: searchParams.searchTerm,
      pageSize: 7,
    },
  });

  useEffect(() => {
    fetchAuctions(url).then((res) => setPageResult(res));
  }, [pageResult, searchParams, url]);

  return (
    <div className="flex flex-col">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold sm:text-3xl">Auctions</h1>
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {pageResult?.results.map((auction, i) => (
          <AuctionCard auction={auction} key={auction.id} index={i} />
        ))}
      </div>
      <PaginationApp currentPage={searchParams.pageNumber || 1} pageCount={pageResult?.pageCount || 0} onPageChange={setPageNumber}/>
    </div>
  );
}
