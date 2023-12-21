import React from 'react';
import Link from 'next/link';
import { Auction } from '@/types';
import { AuctionCard } from './auction-card';
import { AuctionPlaceholder } from './auction-placeholder';

interface AuctionsReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  auctions: Auction[];
}

export const AuctionsReel = async ({
  title,
  subtitle,
  href,
  auctions,
}: AuctionsReelProps) => {
  return (
    <>
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        {href ? (
          <Link
            href={href}
            className="hidden text-md font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Visit the auctions <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
        {auctions &&
          auctions.map((auction, i) => (
            <AuctionCard auction={auction} key={i} index={i} />
          ))}
      </div>
    </>
  );
};
