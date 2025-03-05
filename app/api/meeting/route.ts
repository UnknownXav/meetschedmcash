import { getAllForMeetingClient } from "@/data/Client.data";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Extract specific query parameters

    if(!searchParams){
      return NextResponse.json({message:"no query"},{status:500})
    }

    const id = searchParams?.get("id") ?? "";
    const userType = searchParams?.get("userType") ?? "";
    const resp = await getAllForMeetingClient(id,userType)
    return NextResponse.json(resp, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:500})
  }
}

// export async function UPDATE() {
//   try {
//     const resp = await getAllForMeetingClient()
//     return NextResponse.json(resp, { status: 200 })
//   } catch (error) {}
// }
