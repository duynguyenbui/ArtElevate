'use client';

import { ReactNode, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useBidsStore } from '@/hooks/use-bids-store';
import { Auction, AuctionFinished, Bid } from '@/types';
import { useParams } from 'next/navigation';
import { useAuctionStore } from '@/hooks/use-auctions-store';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/format';

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
  const { addBid } = useBidsStore();
  const { setCurrentPrice, addData } = useAuctionStore();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications`)
      .withAutomaticReconnect()
      .build();

    setConnection(connection);
  }, []);

  useEffect(() => {
    const listen = (connection: HubConnection) => {
      connection.on('BidPlaced', (bid: Bid) => {
        setCurrentPrice(bid.auctionId, bid.amount);
        if (params.auctionId) {
          if (params.auctionId === bid.auctionId) {
            addBid(bid);
          }
        }
      });

      connection.on('AuctionCreated', (auction: Auction) => {
        addData(auction);
        if (user?.username !== auction.seller) {
          toast.message('A new art work has been created!', {
            description: `With ${auction.name} and ${auction.artist}`,
          });
        }
      });

      connection.on('AuctionFinished', (auction: AuctionFinished) => {
        if (user?.username !== auction.seller) {
          toast.message('A new art work has been finished!', {
            description: `With ${
              auction.amount ? formatPrice(auction.amount) : 'no sold'
            } and ${auction.seller}`,
          });
        }
      });
    };

    if (connection) {
      connection
        .start()
        .then(() => listen(connection))
        .catch((error: any) => {
          if (connection.state === 'Disconnected') {
            connection.start().then(() => listen(connection));
          }
        });
    }

    return () => {
      connection?.stop();
    };
  }, [
    addBid,
    addData,
    connection,
    params.auctionId,
    setCurrentPrice,
    user?.username,
  ]);

  return children;
};
