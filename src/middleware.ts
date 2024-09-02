import { NextRequest, NextResponse } from "next/server";
import { signOut } from "../auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(" === pathname", pathname);

  if (pathname === "/logout") {
    signOut()
      .then(() => console.log("signed out"))
      .catch((reason) => console.error(reason));
  }
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: "/logout",
};
