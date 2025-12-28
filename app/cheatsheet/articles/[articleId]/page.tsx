import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getArticle, getTopic } from '@/lib/data';
import { ChevronRight, ChevronLeft } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto pt-10 pb-20 animate-fade-in-up">
        {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/cheatsheet/topics" className="hover:text-apple-dark dark:hover:text-white transition-colors">
          Topics
        </Link>
        {topic && (
          <>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link href={`/cheatsheet/topics/${topic.id}`} className="hover:text-apple-dark dark:hover:text-white transition-colors">
              {topic.name}
            </Link>
          </>
        )}
         <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
         <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{article.title}</span>
      </nav>

      <article>
        <header className="mb-10">
             <h1 className="section-title mb-4 !text-4xl">{article.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Last updated {new Date(article.updatedAt).toLocaleDateString()}</span>
            </div>
        </header>
       
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            {/* Custom components for markdown could be added here later */}
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
      
       <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link href={`/cheatsheet/topics/${topic?.id}`} className="inline-flex items-center text-sm text-apple-blue font-medium hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to {topic?.name}
          </Link>
      </div>
    </div>
  );
}

