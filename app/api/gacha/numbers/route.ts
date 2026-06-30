import { NextResponse } from 'next/server';

const BASE_URL = "https://allapiproject.zone.id/api/gacha";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/numbers`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
