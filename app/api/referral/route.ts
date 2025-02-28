import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import type { Referral } from "@/types"

// In-memory store (replace with database in production)
let referrals: Referral[] = []

export async function GET() {
  return NextResponse.json({ data: referrals }) // Wrap in data property
}

export async function POST(request: NextRequest) {
  const referral = await request.json()
  referrals.push(referral)
  return NextResponse.json({ data: referral })
}

export async function PUT(request: NextRequest) {
  const { companyName, ...updateData } = await request.json()
  referrals = referrals.map((referral) =>
    referral.companyName === companyName ? { ...referral, ...updateData } : referral,
  )
  return NextResponse.json({ success: true })
}

