import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null;

  if (isProtectedRoute && (!session || !session.userId)) {
    console.warn("Redirecting to login: No valid session found");
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session && session.userId) {
    console.log("Redirecting to dashboard: Valid session found");
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isPublicRoute && (!session || !session.userId)) {
    console.log("No session found, staying on public route:", path);
    return NextResponse.next();
  }

  return NextResponse.next();
}
