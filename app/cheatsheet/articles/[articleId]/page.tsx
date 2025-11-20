import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getArticle, getTopic } from '@/lib/data';

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const { articleId } = params;
  const article = await getArticle(articleId);

  if (!article) {
    notFound();
  }

  const topic = await getTopic(article.topicId);

  return (
    <div>
      <div className="mb-4">
        <Link href="/cheatsheet/topics" className="text-blue-600 hover:text-blue-700">
          ← Back to Topics
        </Link>
        {topic && (
          <>
            {' / '}
            <Link href={`/cheatsheet/topics/${topic.id}`} className="text-blue-600 hover:text-blue-700">
              {topic.name}
            </Link>
          </>
        )}
      </div>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-500 text-sm mb-8">
          Last updated: {new Date(article.updatedAt).toLocaleDateString()}
        </div>
        <div className="markdown-content">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

