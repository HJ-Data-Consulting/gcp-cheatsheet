import Link from 'next/link';
import { getTopics, getArticles, getErrors } from '@/lib/data';

export default async function AdminDashboard() {
  const topics = await getTopics();
  const articles = await getArticles();
  const errors = await getErrors();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">{topics.length}</h2>
          <p className="text-gray-600 mb-4">Topics</p>
          <Link
            href="/admin/topics"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Manage Topics →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">{articles.length}</h2>
          <p className="text-gray-600 mb-4">Articles</p>
          <Link
            href="/admin/articles"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Manage Articles →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-2">{errors.length}</h2>
          <p className="text-gray-600 mb-4">Common Errors</p>
          <Link
            href="/admin/errors"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Manage Errors →
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/topics/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Topic
          </Link>
          <Link
            href="/admin/articles/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create New Article
          </Link>
          <Link
            href="/admin/errors/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add New Error
          </Link>
        </div>
      </div>
    </div>
  );
}

