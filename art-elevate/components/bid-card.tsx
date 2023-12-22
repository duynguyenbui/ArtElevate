'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import React from 'react';

export const BidCard = () => {
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Auction Bid Placed</CardTitle>
        <CardDescription>This is history of this auction</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content</p>
      </CardContent>
      <CardFooter>
        <p>Content</p>
      </CardFooter>
    </Card>
  );
};
