import { NextRequest, NextResponse } from 'next/server';
import { getTopics, saveTopics } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const topics = await getTopics();
    const topic = topics.find(t => t.id === id);

    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const topics = await getTopics();
    const index = topics.findIndex(t => t.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    topics[index] = { ...topics[index], name, description };
    await saveTopics(topics);

    return NextResponse.json(topics[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const topics = await getTopics();
    const filtered = topics.filter(t => t.id !== id);

    if (filtered.length === topics.length) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    await saveTopics(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
  }
}

