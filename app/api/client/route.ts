import { createClient, getClient, deleteClientAccount, updateClientAccount } from '@/lib/services/client.service';
import { SaveClientType } from '@/lib/types/client.type';
import { NextResponse } from 'next/server';


// POST: Create a new client
export async function POST(req: Request) {
  try {
    const body = await req.json() as SaveClientType; // Parse request body
    const resp = await createClient(body);
    return NextResponse.json({ data: resp }, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/client:', error); // Log the error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// GET: Retrieve all clients
export async function GET() {
  try {
    const resp = await getClient();
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/client:', error); // Log the error
    return NextResponse.json({ message: 'Failed to fetch clients' }, { status: 500 });
  }
}

// DELETE: Delete a client by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Assuming ID is passed in the request body
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const resp = await deleteClientAccount(id);
    return NextResponse.json({ data: resp, message: 'Client deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/client:', error); // Log the error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update a client by ID
export async function PUT(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const { id, ...updatedData } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const resp = await updateClientAccount(id, updatedData);
    return NextResponse.json({ data: resp, message: 'Client updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/client:', error); // Log the error
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
