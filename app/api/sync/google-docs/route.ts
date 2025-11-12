import { NextResponse } from 'next/server';
import { syncGoogleDocs } from '@/lib/google-docs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await syncGoogleDocs();
    return NextResponse.json({ message: 'Sync completed successfully.' });
  } catch (error) {
    console.error('Error during Google Docs sync:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message: 'Sync failed.', error: errorMessage }, { status: 500 });
  }
}
