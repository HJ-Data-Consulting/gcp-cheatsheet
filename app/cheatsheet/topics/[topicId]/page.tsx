import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTopic, getArticlesByTopic } from '@/lib/data';
import { ChevronLeft, FileText } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto pt-10 pb-20 animate-fade-in-up">
      <Link href="/cheatsheet/topics" className="inline-flex items-center text-sm text-gray-500 hover:text-apple-dark dark:hover:text-white transition-colors mb-8 group">
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Topics
      </Link>
      
      <div className="mb-12">
        <h1 className="section-title mb-4">{topic.name}</h1>
        <p className="text-xl text-gray-500 font-light leading-relaxed">{topic.description}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-xs">Articles in this Topic</h2>
        {articles.length > 0 ? (
          <div className="grid gap-4">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/cheatsheet/articles/${article.id}`}
                className="card-apple group flex items-center justify-between p-6"
              >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <FileText className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-apple-dark dark:text-white group-hover:text-apple-blue transition-colors">{article.title}</h3>
                        <p className="text-gray-500 text-sm mt-1">
                        Last updated {new Date(article.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="text-gray-300 group-hover:text-apple-blue group-hover:translate-x-1 transition-all">
                    &rarr;
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
             <p className="text-gray-500">No articles available for this topic yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

