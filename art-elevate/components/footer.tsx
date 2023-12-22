'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex-grow-0 bottom-0 right-0 left-0 z-50 shadow-sm">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="py-10 md:flex md:items-center md:justify-between border-t">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center md:mt-0">
            <div className="flex space-x-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-gray-600"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};