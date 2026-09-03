import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "senpaitv_access";

// Paths that must stay reachable even when the visitor hasn't unlocked the
// site yet: the gate page itself, its API route, and Next.js internals.
const PUBLIC_PATHS = ["/access-gate", "/api/access-gate", "/_next", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const unlocked = request.cookies.get(COOKIE_NAME)?.value === "granted";
  if (unlocked) {
    return NextResponse.next();
  }

  const gateUrl = new URL("/access-gate", request.url);
  gateUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(gateUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
