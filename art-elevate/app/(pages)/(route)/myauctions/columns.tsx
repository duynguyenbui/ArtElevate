'use client';

import { formatDateTime, formatPrice } from '@/lib/format';
import { Auction } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';


export const columns: ColumnDef<Auction>[] = [
  {
    accessorKey: 'artist',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Artist
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'reservePrice',
    header: 'Reserve Price',
    cell: ({ row }) => {
      return <div>{formatPrice(row.getValue('reservePrice'))}</div>;
    },
  },

  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => <>{formatDateTime(row.getValue('createdAt'))}</>,
  },
  {
    accessorKey: 'auctionEnd',
    header: 'Auction End',
    cell: ({ row }) => <>{formatDateTime(row.getValue('auctionEnd'))}</>,
  },
  {
    accessorKey: 'soldAmount',
    header: 'Sold Amount',
    cell: ({ row }) => {
      return <div>{formatPrice(row.getValue('soldAmount'))}</div>;
    },
  },
  {
    accessorKey: 'currentHighBid',
    header: 'Current High Bid',
    cell: ({ row }) => {
      return <div>{formatPrice(row.getValue('currentHighBid'))}</div>;
    },
  },
  {
    accessorKey: 'winner',
    header: 'Winner',
  },

  {
    accessorKey: 'height',
    header: 'Height',
  },
  {
    accessorKey: 'width',
    header: 'Width',
  },
  {
    accessorKey: 'medium',
    header: 'Medium',
  },
  {
    accessorKey: 'year',
    header: 'Year',
  },
];
