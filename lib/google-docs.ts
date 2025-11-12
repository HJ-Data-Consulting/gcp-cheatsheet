import { Auth } from 'google-auth-library';
import { drive_v3 } from 'googleapis';
import { authenticateWithGoogle } from './google-docs-auth';
import { parseGoogleDoc } from './google-docs-parser';
import { getArticles, getTopics, getErrors, saveArticles, saveTopics, saveErrors } from './data';
import { Article, Topic, CommonError } from '@/types';

const TOPICS_FOLDER_ID = process.env.GOOGLE_DOCS_TOPICS_FOLDER_ID || '';
const ARTICLES_FOLDER_ID = process.env.GOOGLE_DOCS_ARTICLES_FOLDER_ID || '';
const ERRORS_FOLDER_ID = process.env.GOOGLE_DOCS_ERRORS_FOLDER_ID || '';

async function listFiles(auth: Auth.AuthClient, folderId: string): Promise<drive_v3.Schema$File[]> {
  const drive = new drive_v3.Drive({ auth });
  const response = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.document' and trashed=false`,
    fields: 'files(id, name, modifiedTime)',
  });
  return response.data.files || [];
}

export async function syncGoogleDocs() {
  const auth = await authenticateWithGoogle();

  // Sync Topics
  if (TOPICS_FOLDER_ID) {
    const topicFiles = await listFiles(auth, TOPICS_FOLDER_ID);
    const topics: Topic[] = await getTopics();
    // A simple sync: re-generate all topics from Google Docs
    const newTopics: Topic[] = [];
    for (const file of topicFiles) {
        if (file.id && file.name) {
            const { metadata, content } = await parseGoogleDoc(auth, file.id);
            newTopics.push({
                id: metadata.id || file.id,
                name: file.name,
                description: content,
            });
        }
    }
    await saveTopics(newTopics);
  }

  // Sync Articles
  if (ARTICLES_FOLDER_ID) {
    const articleFiles = await listFiles(auth, ARTICLES_FOLDER_ID);
    const articles: Article[] = await getArticles();
    const newArticles: Article[] = [];

    for (const file of articleFiles) {
        if (file.id && file.name) {
            const { metadata, content } = await parseGoogleDoc(auth, file.id);
            const now = new Date().toISOString();
            
            const existingArticle = articles.find(a => a.id === metadata.id);

            newArticles.push({
                id: metadata.id || file.id,
                title: file.name,
                content: content,
                topicId: metadata.topicId,
                createdAt: existingArticle?.createdAt || now,
                updatedAt: now,
            });
        }
    }
    await saveArticles(newArticles);
  }

  // Sync Errors
  if (ERRORS_FOLDER_ID) {
    const errorFiles = await listFiles(auth, ERRORS_FOLDER_ID);
    const errors: CommonError[] = await getErrors();
    const newErrors: CommonError[] = [];

    for (const file of errorFiles) {
        if (file.id && file.name) {
            const { metadata, content } = await parseGoogleDoc(auth, file.id);
            const now = new Date().toISOString();
            const existingError = errors.find(e => e.id === metadata.id);

            newErrors.push({
                id: metadata.id || file.id,
                service: metadata.service,
                errorCode: metadata.errorCode,
                errorMessage: file.name,
                resolution: content,
                createdAt: existingError?.createdAt || now,
                updatedAt: now,
            });
        }
    }
    await saveErrors(newErrors);
  }
}
