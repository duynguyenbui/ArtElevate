'use client';

import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { useDebounce } from '@/stores/use-debounce';
import { useParamsStore } from '@/stores/use-params-store';
import { usePathname } from 'next/navigation';

export const SearchInput = () => {
  const pathname = usePathname();
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value);
  const { setSearchTerm } = useParamsStore();

  useEffect(() => {
    setSearchTerm(debouncedValue);

    return () => setValue('');
  }, [debouncedValue, setSearchTerm]);

  if (pathname !== '/auctions') {
    return null;
  }

  return (
    <div className="relative">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[500px] pl-9 rounded-full focus-visible:ring-slate-200"
        placeholder="Search for a art work"
      />
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
    </div>
  );
};
