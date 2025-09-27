import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "../next-intl";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateSession } from "@lib/session";

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  await updateSession(request);
  // Use next-intl's createMiddleware for locale handling with "as-needed" option
  const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
  });
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/user/profile";
  const isAuthPath = path === "/user/login-register";
  if (isAuthPath && request.cookies.get("session")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isPublicPath && !request.cookies.get("session")) {
    return NextResponse.redirect(new URL("/user/login-register", request.url));
  }

  // Apply the intlMiddleware to handle locale routing
  return intlMiddleware(request) || response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Match all paths except for API and static files
};
