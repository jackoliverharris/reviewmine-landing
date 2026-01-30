import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, reviewCount } = await request.json();

  if (!email || !reviewCount) {
    return NextResponse.json(
      { error: 'Email and review count are required' },
      { status: 400 }
    );
  }

  if (!process.env.LOOPS_API_KEY) {
    console.error('Loops API key not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const response = await fetch(
    'https://app.loops.so/api/v1/contacts/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        source: 'landing_page',
        review_count: reviewCount,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('Loops error:', error);
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
