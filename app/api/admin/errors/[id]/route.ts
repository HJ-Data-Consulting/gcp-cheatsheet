import { NextRequest, NextResponse } from 'next/server';
import { getErrors, saveErrors } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const errors = await getErrors();
    const error = errors.find(e => e.id === id);

    if (!error) {
      return NextResponse.json({ error: 'Error not found' }, { status: 404 });
    }

    return NextResponse.json(error);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { service, errorCode, errorMessage, resolution } = body;

    if (!service || !errorCode || !errorMessage || !resolution) {
      return NextResponse.json(
        { error: 'Service, error code, error message, and resolution are required' },
        { status: 400 }
      );
    }

    const errors = await getErrors();
    const index = errors.findIndex(e => e.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Error not found' }, { status: 404 });
    }

    errors[index] = {
      ...errors[index],
      service,
      errorCode,
      errorMessage,
      resolution,
      updatedAt: new Date().toISOString(),
    };
    await saveErrors(errors);

    return NextResponse.json(errors[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const errors = await getErrors();
    const filtered = errors.filter(e => e.id !== id);

    if (filtered.length === errors.length) {
      return NextResponse.json({ error: 'Error not found' }, { status: 404 });
    }

    await saveErrors(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete error' }, { status: 500 });
  }
}

