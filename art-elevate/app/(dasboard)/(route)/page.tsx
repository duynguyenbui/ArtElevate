import { getAuctions } from '@/actions/auction-actions';
import { AuctionsReel } from '@/components/auction-reel';
import React from 'react';

const RootPage = async () => {
  const results = await getAuctions({
    pageNumber: 1,
    orderBy: 'new',
  });
  return (
    <AuctionsReel
      title={'Recently auctions updated'}
      subtitle="Many auction details can be found here"
      href="/auctions"
      auctions={results.results}
    />
  );
};

export default RootPage;
