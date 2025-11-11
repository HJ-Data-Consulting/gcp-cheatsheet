# GCP Cheat Sheet: Plan and Design

This document outlines the plan and design for the GCP Cheat Sheet website.

## 1. Project Objective

To create a comprehensive, searchable cheat sheet for Google Cloud Platform (GCP) services, including common errors and their solutions. The site will feature an admin panel for content management and is designed to be easily maintainable and scalable.

## 2. Tech Stack

*   **Framework:** Next.js (with TypeScript)
*   **Styling:** Tailwind CSS
*   **Backend (API):** Next.js API Routes
*   **Database:** Start with local JSON files for simplicity, with the ability to migrate to a database like PostgreSQL or a serverless option later.
*   **Search:** `fuse.js` for client-side fuzzy search.
*   **Authentication (Admin):** A simple, secure authentication mechanism for the admin panel (e.g., NextAuth.js).

## 3. Data Models

Content will be structured using the following models, likely stored in JSON files initially (e.g., in a `data/` directory).

### `Topic`

Represents a GCP service category.

```json
{
  "id": "string",
  "name": "string",
  "description": "string"
}
```

### `Article`

Represents a detailed article or guide related to a topic.

```json
{
  "id": "string",
  "topicId": "string",
  "title": "string",
  "content": "string (Markdown)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

### `CommonError`

Represents a common error, its cause, and solution.

```json
{
  "id": "string",
  "service": "string",
  "errorCode": "string",
  "errorMessage": "string",
  "resolution": "string (Markdown)",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## 4. Pages and Routing

*   `/`: **Home Page:** Displays a welcome message and a list of all available topics.
*   `/topics/[topicId]`: **Topic Page:** Lists all articles associated with a specific topic.
*   `/articles/[articleId]`: **Article Page:** Displays the content of a single article.
*   `/errors`: **Common Errors Page:** A searchable list of common GCP errors.
*   `/search`: **Search Results Page:** Displays results from a site-wide search.
*   `/admin`: **Admin Dashboard:** The main entry point for the admin section.
    *   `/admin/login`: Admin login page.
    *   `/admin/articles`: CRUD interface for articles.
    *   `/admin/topics`: CRUD interface for topics.
    *   `/admin/errors`: CRUD interface for common errors.

## 5. Core Features

### 5.1. Content Management (Admin)

*   A secure admin area accessible via `/admin`.
*   Forms for creating, editing, and deleting topics, articles, and common errors.
*   A rich text editor (e.g., a Markdown editor) for article and resolution content.

### 5.2. Search

*   A prominent search bar in the site's header.
*   Client-side search using `fuse.js` to provide instant, fuzzy search results across all articles and errors.
*   The search will look through titles, content, and error codes.

## 6. Future Enhancements

### 6.1. LLM-Powered Chat

*   Integrate a Large Language Model (LLM) to provide a conversational interface.
*   The LLM will be trained or provided with all the content on the site.
*   Users can ask questions in natural language (e.g., "How do I fix a 403 error in Cloud Storage?") and get answers based on the site's knowledge base.

## 7. Development Plan

1.  **Phase 1: Project Setup & Core UI**
    *   Initialize a new Next.js project with TypeScript and Tailwind CSS.
    *   Create the basic page layouts and routing.
    *   Define the data models and create initial seed data in JSON files.
    *   Build the public-facing pages to display topics, articles, and errors from the JSON data.

2.  **Phase 2: Admin Panel**
    *   Set up admin-only routes.
    *   Implement authentication for the admin section.
    *   Build the CRUD interfaces for managing content.

3.  **Phase 3: Search Functionality**
    *   Integrate `fuse.js`.
    *   Create a search component and results page.

4.  **Phase 4: LLM Integration (Future)**
    *   Research and select an appropriate LLM provider.
    *   Develop an API route to handle chat requests.
    *   Build the chat interface.
