import React from 'react';
import { MobileSidebar } from './mobile-sidebar';
import { NavbarRoutes } from './navbar-routes';
import { ModeToggle } from './mode-toggle';

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center shadow-sm w-full">
      <MobileSidebar />

      <NavbarRoutes />
    </div>
  );
};
