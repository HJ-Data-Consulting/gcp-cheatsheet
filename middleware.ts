import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Allow access to login page
    if (req.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Add pathname to headers for server components
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    pages: {
      signIn: '/admin/login',
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow login page without auth
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
