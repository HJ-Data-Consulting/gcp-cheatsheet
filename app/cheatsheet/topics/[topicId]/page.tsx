import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopic, getArticlesByTopic } from '@/lib/data';

export default async function TopicPage({
  params,
}: {
  params: { topicId: string };
}) {
  const { topicId } = params;
  const topic = await getTopic(topicId);
  const articles = await getArticlesByTopic(topicId);

  if (!topic) {
    notFound();
  }

  return (
    <div>
      <Link href="/cheatsheet/topics" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
        ← Back to Topics
      </Link>
      <h1 className="text-3xl font-bold mb-2">{topic.name}</h1>
      <p className="text-gray-600 mb-8">{topic.description}</p>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Articles</h2>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/cheatsheet/articles/${article.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{article.title}</h3>
                <p className="text-gray-500 text-sm">
                  Updated: {new Date(article.updatedAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No articles available for this topic yet.</p>
        )}
      </div>
    </div>
  );
}

