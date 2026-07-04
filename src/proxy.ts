import { NextRequest, NextResponse } from 'next/server';
import { verifyLoginSession } from './lib/login/manage-user';

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // requestHeaders.set('x-path-admin', request.nextUrl.pathname);
  requestHeaders.set('x-path-admin', request.url);
  // console.log('teste no middleware', request.nextUrl.pathname);
  // return NextResponse.next({ headers: requestHeaders });
  const isAdminValid = await verifyLoginSession('admin');

  if (request.nextUrl.pathname.includes('/z_admin') && !request.nextUrl.pathname.includes('/z_admin/auth')) {
    if (!isAdminValid) return NextResponse.redirect(new URL('/z_admin/auth', request.url));
  }

  if (isAdminValid && request.nextUrl.pathname.includes('/z_admin/auth'))
    return NextResponse.redirect(new URL('/z_admin', request.url));

  return NextResponse.next({ request: { headers: requestHeaders } });
}
//fazer o checagem se to logado na paginas
export const config = {
  matcher: ['/:path*', '/z_admin/:path*'],
};
