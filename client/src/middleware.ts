// // middleware.ts
// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const {  cookies } = request;

//   console.log(pathname)
//     const sessionCookie = request.cookies.get("token")?.value;
//   console.log("Middleware check - pathname:", pathname, "session cookie:", sessionCookie);


//   if(pathname === "/" && sessionCookie){
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }


//   // Protect all pages under /dashboard and /profile with session cookie
//   if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
//     if (!cookies.get("token")?.value) {
//       // Redirect unauthorized users to homepage or login page
//       console.log("No session cookie found, redirecting to /");
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   }

//   // Allow everything else
//   return NextResponse.next();
// }

// // Only run middleware for these routes
// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/profile" , "/settings"],
// };
