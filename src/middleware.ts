import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_PAGES = ['/'];

export async function middleware(request: NextRequest) {
  // TODO: session.expires で `'2025-03-13T12:25:26.945Z'` の形式で日時を取得できるため、有効期限のチェックを入れる
  const session = await auth();
  const { pathname } = request.nextUrl;

  if (pathname === '/' && session) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // 認証が必要なページで、セッションがない場合は / にリダイレクト
  if (!PUBLIC_PAGES.includes(pathname) && !session) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
