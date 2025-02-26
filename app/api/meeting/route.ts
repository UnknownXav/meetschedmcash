import { createMeeting, getMeeting, deleteMeeting } from '@/lib/services/meeting.service';
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
        const resp = await getMeeting();
            return NextResponse.json(resp, { status: 200 });
          } catch (error) {
            console.error('Error in GET /api/meeting:', error); // Log the error
            return NextResponse.json({ message: 'Failed to fetch meeting' }, { status: 500 });
          }
        }


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Assuming ID is passed in the request body
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const resp = await deleteMeeting(id);
    return NextResponse.json({ data: resp, message: 'Meeting deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/meeting:', error); // Log the error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
