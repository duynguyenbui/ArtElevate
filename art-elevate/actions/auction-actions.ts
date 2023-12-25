'use server';

import { Auction, Bid, PageResult, SearchParams } from '@/types';
import axios from 'axios';
import { getHeaders } from './auth-action';

export async function getAuctions(
  searchParams: SearchParams
): Promise<PageResult<Auction>> {
  try {
    const result = await axios.get(`${process.env.API_SERVER_URL}/search`, {
      params: {
        searchTerm: searchParams?.searchTerm,
        orderBy: searchParams?.orderBy,
        filterBy: searchParams?.filterBy,
        seller: searchParams?.seller,
        winner: searchParams?.winner,
        pageNumber: searchParams?.pageNumber,
        pageSize: searchParams?.pageSize,
      },
    });
    return result.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
}

export const fetchAuctions = (url: string) =>
  axios.get(url).then((res) => res.data) as Promise<PageResult<Auction>>;

export const fetchAuctionId = (url: string) =>
  axios.get(url).then((res) => res.data) as Promise<Auction>;

export const getBidsForAuction = async (id: string) =>
  axios
    .get(`${process.env.API_SERVER_URL}/bids/${id}`)
    .then((res) => res.data) as Promise<Bid[]>;

export async function placeBidForAuctionAmount(
  auctionId: string,
  amount: number
): Promise<Bid> {
  return await axios
    .post(
      `${process.env.API_SERVER_URL}/bids?auctionId=${auctionId}&amount=${amount}`,
      {},
      {
        headers: {
          Authorization: await getHeaders(),
        },
      }
    )
    .then((res) => res.data);
}

export const getAuctionsBySeller = (seller: string) =>
  (axios
    .options(`${process.env.API_SERVER_URL}/search?seller=${seller}`)
    .then((res) => res.data) as Promise<Auction[]>) || [];
