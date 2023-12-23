'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useBidsStore } from '@/stores/use-bids-store';
import { Bid } from '@/types';
import { useParams } from 'next/navigation';
import { useAuctionStore } from '@/stores/use-auctions-store';

export const SignalRProvider = ({ children }: PropsWithChildren) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const params = useParams();
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
        })
        .catch((error) => console.log(error));
    }

    return () => {
      connection?.stop();
    };
  }, [connection, addBid, params.auctionId]);

  return children;
};
