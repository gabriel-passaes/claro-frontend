import { NextResponse, type NextRequest } from 'next/server';

export function authMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token')?.value;

  const isRoot = url.pathname === '/';
  const isPublic = ['/auth', '/auth/login', '/auth/register'].some((path) =>
    url.pathname.startsWith(path),
  );

  if (isRoot) {
    url.pathname = token ? '/dashboard' : '/auth/login';
    return NextResponse.redirect(url);
  }

  if (isPublic) {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
