import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-path-admin', request.nextUrl.pathname);
  // console.log('teste no middleware', request.nextUrl.pathname);
  // return NextResponse.next({ headers: requestHeaders });
  return NextResponse.next({ request: { headers: requestHeaders } });
}
//fazer o checagem se to logado na paginas
export const config = {
  matcher: ['/:path'],
};
