import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, reviewCount, challenge } = await request.json();

    if (!email || !reviewCount) {
      return NextResponse.json(
        { error: 'Email and review count are required' },
        { status: 400 }
      );
    }

    if (!process.env.LOOPS_API_KEY) {
      console.error('LOOPS_API_KEY environment variable is not configured');
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
          reviewCount: reviewCount,
          ...(challenge
            ? {
                challenge,
                whatIsYourBiggestReviewWorkflowBottleneck: challenge,
              }
            : {}),
        }),
      }
    );

    const data = await response.json();

    // Handle success
    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Handle duplicate contact (409 Conflict) - treat as success
    if (response.status === 409) {
      console.log('Contact already exists:', email);
      return NextResponse.json({ success: true });
    }

    // Handle other errors
    console.error('Loops API error:', response.status, data);
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Subscribe endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
