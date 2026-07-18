import { NextRequest, NextResponse } from 'next/server';
import { verifyLoginSession } from './lib/login/manage-user';

const pasteExcludes = ['_next', 'images'];

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // requestHeaders.set('x-path-admin', request.nextUrl.pathname);
  requestHeaders.set('x-path-admin', request.url);
  // console.log('teste no middleware', request.nextUrl.pathname);
  // return NextResponse.next({ headers: requestHeaders });

  const isAdminValid = await verifyLoginSession('admin');
  const isUserValid = await verifyLoginSession('user');
  const urlValid = request.nextUrl.pathname.trim();
  if (
    urlValid.includes('/z_admin') &&
    !urlValid.includes('/z_admin/auth') &&
    excludePasteNext(pasteExcludes, urlValid)
  ) {
    if (!isAdminValid) return NextResponse.redirect(new URL('/z_admin/auth', request.url));
  }

  if (isAdminValid && urlValid.includes('/z_admin/auth') && excludePasteNext(pasteExcludes, urlValid))
    return NextResponse.redirect(new URL('/z_admin', request.url));

  if (!isAdminValid && !isUserValid) {
    if (urlValid.length > 1 && !urlValid.match(/\/$/gim) && excludePasteNext(pasteExcludes, urlValid)) {
      console.log('oi', urlValid);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}
//fazer o checagem se to logado na paginas
export const config = {
  matcher: ['/:path*', '/z_admin/:path*'],
};

function excludePasteNext(pasteExcludes: string[], urlPathname: string): boolean {
  return !pasteExcludes.find((value) => urlPathname.includes(value));
}
