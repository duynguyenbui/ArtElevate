import React from 'react';
import { Logo } from './logo';
import { SearchInput } from './search-input';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

export const Navbar = () => {
  return (
    <div className="h-full border-b flex items-center shadow-sm justify-between m-2 p-2">
      <div className="ml-10">
        <Logo />
      </div>
      <SearchInput />
      <div className="flex space-x-2 mr-10">
        <ModeToggle />
        <Button>Login</Button>
      </div>
    </div>
  );
};
