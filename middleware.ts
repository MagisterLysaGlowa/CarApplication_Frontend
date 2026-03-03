import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from "./app/actions/getAuth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // Perform the authentication check
  const authResult = await getAuth();

  if (!authResult || !authResult.success) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // If the token is valid, proceed with the request
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/moje-zlecenia",
    "/wiadomosci",
    "/profil",
    "/pakiety",
    "/koszyk",
    "/zlecenie",
    "/platnosci",
  ],
};
