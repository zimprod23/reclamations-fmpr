import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isAuth = !!token;
    const isAuthPage =
      pathname.startsWith("/login") ||
      pathname.startsWith("/register");

    // 🚫 Not logged in → block protected routes
    if (!isAuth && (pathname.startsWith("/student") || pathname.startsWith("/admin"))) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🚫 Logged in → prevent visiting login/register
    if (isAuth && isAuthPage) {
      if (token?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    // 🔐 Role protection
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    if (pathname.startsWith("/student") && token?.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/student/:path*", "/admin/:path*", "/login", "/register"],
};
