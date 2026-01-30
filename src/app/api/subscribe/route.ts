import { NextRequest, NextResponse } from "next/server";

const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { email, reviewCount } = await request.json();

    if (!email || !reviewCount) {
      return NextResponse.json(
        { error: "Email and review count are required" },
        { status: 400 }
      );
    }

    if (!CONVERTKIT_FORM_ID || !CONVERTKIT_API_KEY) {
      console.error("ConvertKit credentials not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
          fields: {
            review_count: reviewCount,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("ConvertKit error:", errorData);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
