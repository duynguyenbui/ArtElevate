'use client';

import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from './ui/input';

export const SearchInput = () => {
  const [value, setValue] = useState('');

  return (
    <div className="relative">
      <Input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="w-full md:w-[600px] pl-9 rounded-full focus-visible:ring-slate-200"
        placeholder="Search for a art work do you want"
      />
      <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
    </div>
  );
};
