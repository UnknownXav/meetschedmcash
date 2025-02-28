import { createClient, getClient } from "@/data/Client.data"
import { InsertClientDto } from "@/lib/dto/Client.dto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InsertClientDto // Parse request body
    const resp = await createClient(body)
    return NextResponse.json({ data: resp }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const resp = await getClient()
    return NextResponse.json(resp, { status: 200 })
  } catch (error) {}
}
