import { createUser } from "@/data/User.data"
import { CreateUserDto } from "@/lib/dto/User.dto"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {

    const body = (await req.json()) as CreateUserDto // Parse request body
    const resp = await createUser(body)
    return NextResponse.json({ data: resp }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
