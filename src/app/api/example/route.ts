import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("The API was called");
  try {
    const body = await request.json();
    // Simulate success
    return NextResponse.json({ id: body.id, success: true });
  } catch (error) {
    // Simulate error
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}