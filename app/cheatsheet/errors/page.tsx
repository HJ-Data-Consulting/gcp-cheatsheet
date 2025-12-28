import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getErrors } from '@/lib/data';
import { AlertCircle } from 'lucide-react';

export default async function ErrorsPage() {
  const errors = await getErrors();

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20 animate-fade-in-up">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="section-title">Common GCP Errors</h1>
        <p className="section-subtitle">
          Diagnose and resolve frequent issues across Google Cloud Platform services.
        </p>
      </div>

      {errors.length > 0 ? (
        <div className="grid gap-6">
          {errors.map((error) => (
            <div
              key={error.id}
              className="card-apple"
            >
              <div className="flex items-start gap-4 mb-4">
                 <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                 </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                     <h2 className="text-lg font-semibold text-apple-dark dark:text-white">{error.service}</h2>
                     <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs font-mono">
                      {error.errorCode}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 font-medium mb-4">{error.errorMessage}</p>
                   <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
                     <ReactMarkdown>{error.resolution}</ReactMarkdown>
                  </div>
                </div>
              </div>
             
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl">
          <p className="text-gray-500">No errors documented yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

