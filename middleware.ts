// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token;
//     const isAuth = !!token;
//     const isIndexPage = req.nextUrl.pathname === "/";

//     // 1. Role-based protection
//     if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/student/dashboard", req.url));
//     }

//     if (
//       req.nextUrl.pathname.startsWith("/student") &&
//       token?.role !== "STUDENT"
//     ) {
//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       // This ensures the middleware only runs if authorized returns true
//       authorized: ({ token }) => !!token,
//     },
//     pages: {
//       signIn: "/login",
//     },
//   },
// );

// export const config = {
//   // Routes to protect
//   matcher: ["/student/:path*", "/admin/:path*", "/api/protected/:path*"],
// };
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    // If the user is logged in and tries to access login/register, send them to dashboard
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL("/student/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // We set this to true so the middleware function above ALWAYS runs
      // even for non-logged in users on the login/register pages
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/student/:path*", "/admin/:path*", "/login", "/register"],
};
