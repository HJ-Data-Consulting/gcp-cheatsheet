import { NextRequest, NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const articles = await getArticles();
    const article = articles.find(a => a.id === id);

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { topicId, title, content } = body;

    if (!topicId || !title || !content) {
      return NextResponse.json(
        { error: 'Topic ID, title, and content are required' },
        { status: 400 }
      );
    }

    const articles = await getArticles();
    const index = articles.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    articles[index] = {
      ...articles[index],
      topicId,
      title,
      content,
      updatedAt: new Date().toISOString(),
    };
    await saveArticles(articles);

    return NextResponse.json(articles[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const articles = await getArticles();
    const filtered = articles.filter(a => a.id !== id);

    if (filtered.length === articles.length) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await saveArticles(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
  }
}

