// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 사용자가 로그인하지 않았다면 /login으로 리디렉션
  if (
    !token &&
    req.nextUrl.pathname !== '/login' &&
    req.nextUrl.pathname !== '/'
  ) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 사용자가 로그인한 경우, /login 페이지에 접근하면 홈으로 리디렉션
  if (token && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

// 적용할 경로를 설정 (모든 경로에 대해 미들웨어 적용)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
