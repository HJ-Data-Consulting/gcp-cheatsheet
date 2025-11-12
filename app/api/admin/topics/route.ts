import { NextRequest, NextResponse } from 'next/server';
import { getTopics, saveTopics } from '@/lib/data';
import { Topic } from '@/types';

export async function GET() {
  try {
    const topics = await getTopics();
    return NextResponse.json(topics);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'Name and description are required' }, { status: 400 });
    }

    const topics = await getTopics();
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      name,
      description,
    };

    topics.push(newTopic);
    await saveTopics(topics);

    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}

