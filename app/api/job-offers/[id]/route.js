import { NextResponse } from 'next/server';
import { getJobOffer } from '@/lib/leaders-api';

export async function GET(_request, { params }) {
  const { id } = await params;

  try {
    const offer = await getJobOffer(id);
    if (!offer) {
      return NextResponse.json({ success: false, message: 'Offer not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: offer });
  } catch (err) {
    const message = err.message || 'Failed to load job offer';
    const status = message.includes('must be set') ? 503 : 502;
    return NextResponse.json({ success: false, message }, { status });
  }
}
