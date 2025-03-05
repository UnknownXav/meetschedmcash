import { logout } from "@/lib/utils/auth.utils"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    await logout()
    return NextResponse.json({ message: "Logout" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}