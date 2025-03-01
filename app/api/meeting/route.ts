import { getAllForMeetingClient } from "@/data/Client.data"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const resp = await getAllForMeetingClient()
    return NextResponse.json(resp, { status: 200 })
  } catch (error) {}
}

export async function UPDATE() {
  try {
    const resp = await getAllForMeetingClient()
    return NextResponse.json(resp, { status: 200 })
  } catch (error) {}
}
