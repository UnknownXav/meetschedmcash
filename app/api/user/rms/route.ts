import { getRms } from "@/data/User.data";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {
    
    const resp = await getRms()
    return NextResponse.json(resp, { status: 200 })
  } catch (error) {}
}