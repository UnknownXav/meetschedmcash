import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: 'GET requests are not allowed' }, { status: 200 });
  }
  