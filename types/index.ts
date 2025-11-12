export interface Topic {
  id: string;
  name: string;
  description: string;
}

export interface Article {
  id: string;
  topicId: string;
  title: string;
  content: string; // Markdown
  createdAt: string;
  updatedAt: string;
}

export interface CommonError {
  id: string;
  service: string;
  errorCode: string;
  errorMessage: string;
  resolution: string; // Markdown
  createdAt: string;
  updatedAt: string;
}

