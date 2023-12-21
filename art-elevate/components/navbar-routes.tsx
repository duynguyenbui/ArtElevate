import React from 'react';
import { ModeToggle } from './mode-toggle';
import { Logo } from './logo';
import { SearchInput } from './search-input';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';
import { NavigationMenuBar } from './navigation-menu';

export const NavbarRoutes = () => {
  return (
    <div className="hidden md:flex items-center w-full justify-between">
      <Logo />
      <NavigationMenuBar />
      <SearchInput />
      <div className="flex items-center justify-center space-x-3">
        <ModeToggle />
        <Button variant="default">
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      </div>
    </div>
  );
};
