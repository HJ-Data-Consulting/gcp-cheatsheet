import Link from 'next/link';
import { searchContent } from '@/lib/search';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const { q } = searchParams;
  const query = q || '';

  const results = query ? await searchContent(query) : [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>

      {query && (
        <p className="text-gray-600 mb-6">
          {results.length > 0
            ? `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}

      {!query && (
        <p className="text-gray-600 mb-6">Enter a search query to find articles and errors.</p>
      )}

      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm mr-2">
                    {result.type === 'article' ? 'Article' : 'Error'}
                  </span>
                  {result.type === 'error' && result.metadata?.service && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                      {result.metadata.service}
                    </span>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">
                {result.type === 'article' ? (
                  <Link
                    href={`/cheatsheet/articles/${result.id}`}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {result.title}
                  </Link>
                ) : (
                  result.title
                )}
              </h2>
              {result.type === 'error' && result.metadata?.errorCode && (
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Error Code: </span>
                  <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                    {result.metadata.errorCode}
                  </span>
                </div>
              )}
              <div className="text-sm text-gray-600 line-clamp-3">
                <p>
                  {(() => {
                    // Strip markdown syntax for preview
                    let preview = result.content
                      .replace(/^#+\s+/gm, '') // Remove headers
                      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
                      .replace(/\*(.*?)\*/g, '$1') // Remove italic
                      .replace(/`(.*?)`/g, '$1') // Remove inline code
                      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
                      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                      .trim();

                    const originalLength = preview.length;
                    // Get first 200 characters
                    preview = preview.substring(0, 200);
                    if (originalLength > 200) {
                      preview += '...';
                    }
                    return preview;
                  })()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

