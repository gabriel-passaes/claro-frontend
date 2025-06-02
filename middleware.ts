import { type NextRequest } from 'next/server';
import { authMiddleware } from './src/middleware/authMiddleware';

export function middleware(req: NextRequest) {
  return authMiddleware(req);
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/:path*'],
};
