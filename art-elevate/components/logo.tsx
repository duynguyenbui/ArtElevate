'use client';

import { useParamsStore } from '@/stores/use-params-store';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  const { reset } = useParamsStore();
  return (
    <Link href="/" onClick={() => reset()}>
      <Image
        height={100}
        width={100}
        alt="logo"
        src="/logo.svg"
        className="p-5"
      />
    </Link>
  );
};
