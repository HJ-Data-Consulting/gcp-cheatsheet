import Link from 'next/link';
import { getTopics } from '@/lib/data';

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 animate-fade-in-up">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="section-title">GCP Topics</h1>
        <p className="section-subtitle">
          Explore detailed guides and articles about Google Cloud Platform services.
        </p>
      </div>

      {topics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/cheatsheet/topics/${topic.id}`}
              className="card-apple block group"
            >
              <h3 className="text-xl font-semibold mb-3 text-apple-dark dark:text-white group-hover:text-apple-blue transition-colors">
                {topic.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                {topic.description}
              </p>
              <div className="mt-4 flex items-center text-apple-blue text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read Guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
          <p className="text-gray-500">No topics available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
