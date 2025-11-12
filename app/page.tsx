import Link from 'next/link';
import { getTopics } from '@/lib/data';

export default async function HomePage() {
  const topics = await getTopics();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to GCP Cheat Sheet</h1>
        <p className="text-xl text-gray-600">
          Your comprehensive guide to Google Cloud Platform services, common errors, and solutions.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="block p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">{topic.name}</h3>
              <p className="text-gray-600">{topic.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {topics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No topics available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

