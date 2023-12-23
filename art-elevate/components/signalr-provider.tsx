'use client';

import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useBidsStore } from '@/stores/use-bids-store';
import { Auction, AuctionFinished, Bid } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { useAuctionStore } from '@/stores/use-auctions-store';
import { toast } from 'sonner';

interface SignalRProviderProps {
  children: ReactNode;
  user:
    | ({
        username: string;
      } & {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      })
    | null;
}

export const SignalRProvider = ({ children, user }: SignalRProviderProps) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const params = useParams();
  const router = useRouter();
  const { addBid } = useBidsStore();
  const { setCurrentPrice } = useAuctionStore();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('BidPlaced', (bid: Bid) => {
            setCurrentPrice(bid.auctionId, bid.amount);
            if (params.auctionId) {
              if (params.auctionId === bid.auctionId) {
                addBid(bid);
              }
            }
          });

          connection.on('AuctionCreated', (auction: Auction) => {
            if (user?.username !== auction.seller) {
              toast.message('A new art work has been created!', {
                description: `With ${auction.name} and ${auction.artist}`,
                action: {
                  label: 'See now',
                  onClick: () => router.push(`/auctions/${auction.id}`),
                },
              });
            }
          });

          connection.on('AuctionFinished', (auction: AuctionFinished) => {
            if (user?.username !== auction.seller) {
              toast.message('A new art work has been finished!', {
                description: `With ${
                  auction.amount ? auction.amount : 'no sold'
                } and ${auction.seller}`,
                action: {
                  label: 'See now',
                  onClick: () => router.push(`/auctions/${auction.auctionId}`),
                },
              });
            }
          });
        })
        .catch((error) => console.log(error));
    }

    return () => {
      connection?.stop();
    };
  }, [addBid, connection, params.auctionId, router, setCurrentPrice, user?.username]);

  return children;
};
