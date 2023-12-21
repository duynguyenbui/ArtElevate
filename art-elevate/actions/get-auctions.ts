import { Auction, PageResult, SearchParams } from '@/types';
import axios from 'axios';

export async function getAuctions(
  searchParams: SearchParams
): Promise<PageResult<Auction>> {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/search`,
      {
        params: {
          searchTerm: searchParams?.searchTerm,
          orderBy: searchParams?.orderBy,
          filterBy: searchParams?.filterBy,
          seller: searchParams?.seller,
          winner: searchParams?.winner,
          pageNumber: searchParams?.pageNumber,
          pageSize: searchParams?.pageSize,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    throw error;
  }
}
