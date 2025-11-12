import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getErrors } from '@/lib/data';

export default async function ErrorsPage() {
  const errors = await getErrors();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Common GCP Errors</h1>
      <p className="text-gray-600 mb-8">
        Browse common errors and their solutions across GCP services.
      </p>

      {errors.length > 0 ? (
        <div className="space-y-6">
          {errors.map((error) => (
            <div
              key={error.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{error.service}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                      {error.errorCode}
                    </span>
                    <span className="text-gray-600">{error.errorMessage}</span>
                  </div>
                </div>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown>{error.resolution}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No errors documented yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

