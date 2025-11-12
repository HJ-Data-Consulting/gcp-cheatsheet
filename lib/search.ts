import Fuse from 'fuse.js';
import { Article, CommonError } from '@/types';
import { getArticles, getErrors } from './data';

export interface SearchResult {
  type: 'article' | 'error';
  id: string;
  title: string;
  content: string;
  metadata?: {
    topicId?: string;
    service?: string;
    errorCode?: string;
  };
}

export async function searchContent(query: string): Promise<SearchResult[]> {
  const articles = await getArticles();
  const errors = await getErrors();

  // Prepare searchable data
  const searchableArticles: SearchResult[] = articles.map(article => ({
    type: 'article' as const,
    id: article.id,
    title: article.title,
    content: article.content,
    metadata: { topicId: article.topicId },
  }));

  const searchableErrors: SearchResult[] = errors.map(error => ({
    type: 'error' as const,
    id: error.id,
    title: `${error.service} - ${error.errorCode}`,
    content: `${error.errorMessage} ${error.resolution}`,
    metadata: {
      service: error.service,
      errorCode: error.errorCode,
    },
  }));

  const allItems = [...searchableArticles, ...searchableErrors];

  // Configure Fuse.js
  const fuse = new Fuse(allItems, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'content', weight: 0.3 },
      { name: 'metadata.service', weight: 0.2 },
      { name: 'metadata.errorCode', weight: 0.1 },
    ],
    threshold: 0.4, // 0 = perfect match, 1 = match anything
    includeScore: true,
    minMatchCharLength: 2,
  });

  const results = fuse.search(query);
  return results.map(result => result.item);
}

