import { promises as fs } from 'fs';
import path from 'path';
import { Topic, Article, CommonError } from '@/types';

const dataDir = path.join(process.cwd(), 'data');

// Topics
export async function getTopics(): Promise<Topic[]> {
  const filePath = path.join(dataDir, 'topics.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export async function getTopic(id: string): Promise<Topic | null> {
  const topics = await getTopics();
  return topics.find(t => t.id === id) || null;
}

export async function saveTopics(topics: Topic[]): Promise<void> {
  const filePath = path.join(dataDir, 'topics.json');
  await fs.writeFile(filePath, JSON.stringify(topics, null, 2), 'utf8');
}

// Articles
export async function getArticles(): Promise<Article[]> {
  const filePath = path.join(dataDir, 'articles.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export async function getArticle(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find(a => a.id === id) || null;
}

export async function getArticlesByTopic(topicId: string): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter(a => a.topicId === topicId);
}

export async function saveArticles(articles: Article[]): Promise<void> {
  const filePath = path.join(dataDir, 'articles.json');
  await fs.writeFile(filePath, JSON.stringify(articles, null, 2), 'utf8');
}

// Common Errors
export async function getErrors(): Promise<CommonError[]> {
  const filePath = path.join(dataDir, 'errors.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

export async function getError(id: string): Promise<CommonError | null> {
  const errors = await getErrors();
  return errors.find(e => e.id === id) || null;
}

export async function saveErrors(errors: CommonError[]): Promise<void> {
  const filePath = path.join(dataDir, 'errors.json');
  await fs.writeFile(filePath, JSON.stringify(errors, null, 2), 'utf8');
}

