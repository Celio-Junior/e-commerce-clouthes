import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-path', request.nextUrl.pathname);
  // console.log('teste no middleware', request.nextUrl.pathname);
  // return NextResponse.next({ headers: requestHeaders });
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ['/z_admin/auth'],
};
