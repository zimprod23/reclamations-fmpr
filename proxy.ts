import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const isAuthPage =
      pathname.startsWith("/login") || pathname.startsWith("/register");
    const isAdminRoute = pathname.startsWith("/admin");
    const isStudentRoute = pathname.startsWith("/student");

    // 1. Handle authenticated users visiting Login/Register
    if (isAuthPage && token) {
      const dashboard =
        token.role === "ADMIN" ? "/admin/dashboard" : "/student/dashboard";
      return NextResponse.redirect(new URL(dashboard, req.url));
    }

    // 2. Role-Based Protection: Admin Routes
    if (isAdminRoute && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    // 3. Role-Based Protection: Student Routes
    if (isStudentRoute && token?.role !== "STUDENT") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public paths that don't require a token
        if (
          pathname.startsWith("/login") ||
          pathname.startsWith("/register") ||
          pathname === "/"
        ) {
          return true;
        }

        // All other paths (Admin/Student) require a valid token
        return !!token;
      },
    },
  },
);

// This defines which routes the middleware will run on
export const config = {
  matcher: ["/admin/:path*", "/student/:path*", "/login", "/register"],
};
