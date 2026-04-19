import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";

async function getExpectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const data = new TextEncoder().encode(secret + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If already logged in and visiting /login, redirect to /admin
  if (pathname === "/login") {
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    const expectedToken = await getExpectedToken();
    if (sessionCookie && sessionCookie === expectedToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
    const expectedToken = await getExpectedToken();

    if (!sessionCookie || sessionCookie !== expectedToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
