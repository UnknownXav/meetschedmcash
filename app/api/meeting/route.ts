import { createMeeting, getMeeting } from '@/lib/services/meeting.service';
import { SaveMeetingType } from '@/lib/types/meeting.type';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json() as SaveMeetingType // Parse request body
    const resp = await createMeeting(body)
    return NextResponse.json({data:resp}, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
    try {
        const resp = await getMeeting()
        return NextResponse.json(resp, { status: 200 });
    } catch (error) {
        
    } 
}
