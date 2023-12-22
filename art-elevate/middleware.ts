export { default } from 'next-auth/middleware';

export const config = { matcher: ['/session/:path*', '/sell/:path*', '/autions-won/:path*'] };
