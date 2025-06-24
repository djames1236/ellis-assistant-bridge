import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { summary, description, year, month, day, hour, minute, duration } = data;

    if (!summary || !description || !year || !month || !day || !hour || !minute || !duration) {
      return NextResponse.json({ error: 'Missing required scheduling fields' }, { status: 400 });
    }

    // ✅ You can place your real scheduling logic here

    return NextResponse.json({
      message: 'Event scheduled (mock)',
      event: { summary, description, year, month, day, hour, minute, duration }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
