import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/utils/auth.utils";

export async function middleware(request:NextRequest){
    const { pathname } = request.nextUrl;
    if ( pathname.startsWith("/_next/") || // Next.js built files
    pathname.startsWith("/static/") || // Static assets folder
    pathname.startsWith("/public/") || // Public folder images
    pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf)$/) || request.nextUrl.pathname.startsWith('/api')) {
 
        return NextResponse.next();
    }
    return  await updateSession(request);
}

