import { NextRequest, NextResponse } from 'next/server';
import { getErrors, saveErrors } from '@/lib/data';
import { CommonError } from '@/types';

export async function GET() {
  try {
    const errors = await getErrors();
    return NextResponse.json(errors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch errors' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { service, errorCode, errorMessage, resolution } = body;

    if (!service || !errorCode || !errorMessage || !resolution) {
      return NextResponse.json(
        { error: 'Service, error code, error message, and resolution are required' },
        { status: 400 }
      );
    }

    const errors = await getErrors();
    const now = new Date().toISOString();
    const newError: CommonError = {
      id: `error-${Date.now()}`,
      service,
      errorCode,
      errorMessage,
      resolution,
      createdAt: now,
      updatedAt: now,
    };

    errors.push(newError);
    await saveErrors(errors);

    return NextResponse.json(newError, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create error' }, { status: 500 });
  }
}

