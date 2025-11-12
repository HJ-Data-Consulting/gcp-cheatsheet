import { NextRequest, NextResponse } from 'next/server';
import { getArticles, saveArticles } from '@/lib/data';
import { Article } from '@/types';

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topicId, title, content } = body;

    if (!topicId || !title || !content) {
      return NextResponse.json(
        { error: 'Topic ID, title, and content are required' },
        { status: 400 }
      );
    }

    const articles = await getArticles();
    const now = new Date().toISOString();
    const newArticle: Article = {
      id: `article-${Date.now()}`,
      topicId,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    articles.push(newArticle);
    await saveArticles(articles);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}

