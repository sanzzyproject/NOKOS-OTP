import { NextResponse } from 'next/server';

const BASE_URL = "https://allapiproject.zone.id/api/gacha";

let cachedData: any = null;
let cacheTime = 0;
const CACHE_TTL = 15000; // 15 seconds

export async function GET() {
  try {
    const now = Date.now();
    if (cachedData && (now - cacheTime < CACHE_TTL)) {
      return NextResponse.json(cachedData);
    }

    const res = await fetch(`${BASE_URL}/numbers`, {
      cache: 'no-store',
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0"
      }
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    cachedData = data;
    cacheTime = now;
    
    return NextResponse.json(data);
  } catch (err: any) {
    if (cachedData) {
      return NextResponse.json(cachedData);
    }
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
