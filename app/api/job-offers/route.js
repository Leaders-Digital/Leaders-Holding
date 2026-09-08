import { NextResponse } from 'next/server';
import { getPublishedJobOffers } from '@/lib/leaders-api';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const limit = Math.min(50, Math.max(1, Number(searchParams.get('limit')) || 20));

  try {
    const result = await getPublishedJobOffers(page, limit);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    const message = err.message || 'Failed to load job offers';
    const status = message.includes('must be set') ? 503 : 502;
    return NextResponse.json({ success: false, message }, { status });
  }
}
