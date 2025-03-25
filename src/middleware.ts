import { NextRequest, NextResponse } from "next/server";
import { ACCOUNT_ACCESS_TOKEN } from "./constant";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get(ACCOUNT_ACCESS_TOKEN);
    const loginUrl = new URL("/login", request.nextUrl);

    // Allow access to login and public assets (fix for UI issues)
    if (
        request.nextUrl.pathname.startsWith("/_next") || // Next.js static files
        request.nextUrl.pathname.startsWith("/api") || // API routes
        request.nextUrl.pathname.startsWith("/public") || // Public assets
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register"
    ) {
        return NextResponse.next();
    }

    // Redirect if no access token
    if (!accessToken?.value) {
        console.log("Redirecting to login...");
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Apply middleware to all pages except public assets
export const config = {
    matcher: "/((?!_next|api|public).*)",
};
