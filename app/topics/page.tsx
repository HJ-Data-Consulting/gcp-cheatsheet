import Link from 'next/link';
import { getTopics } from '@/lib/data';

export default async function TopicsPage() {
  const topics = await getTopics();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">GCP Topics</h1>
      <p className="text-gray-600 mb-8">
        Explore detailed guides and articles about Google Cloud Platform services.
      </p>

      {topics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="block bg-white p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{topic.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{topic.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No topics available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
