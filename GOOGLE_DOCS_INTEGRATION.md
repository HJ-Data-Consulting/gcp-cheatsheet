# Google Docs API Integration - App Structure

This document outlines the current application structure and where Google Docs API integration should be implemented to automate content updates.

## Current Application Structure

### Data Storage
- **Location**: `/data/` directory
- **Files**:
  - `topics.json` - Array of Topic objects
  - `articles.json` - Array of Article objects  
  - `errors.json` - Array of CommonError objects

### Data Models

#### Topic
```typescript
{
  id: string;
  name: string;
  description: string;
}
```

#### Article
```typescript
{
  id: string;
  topicId: string;
  title: string;
  content: string; // Markdown format
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
```

#### CommonError
```typescript
{
  id: string;
  service: string;
  errorCode: string;
  errorMessage: string;
  resolution: string; // Markdown format
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
```

### Current Data Layer
- **File**: `/lib/data.ts`
- **Functions**:
  - `getTopics()`, `getTopic(id)`, `saveTopics(topics)`
  - `getArticles()`, `getArticle(id)`, `getArticlesByTopic(topicId)`, `saveArticles(articles)`
  - `getErrors()`, `getError(id)`, `saveErrors(errors)`

### API Routes
- **Location**: `/app/api/admin/`
- **Endpoints**:
  - `/api/admin/topics` - GET, POST
  - `/api/admin/topics/[id]` - GET, PUT, DELETE
  - `/api/admin/articles` - GET, POST
  - `/api/admin/articles/[id]` - GET, PUT, DELETE
  - `/api/admin/errors` - GET, POST
  - `/api/admin/errors/[id]` - GET, PUT, DELETE

## Implemented Integration Architecture

### 1. Authentication

The integration uses Google Cloud's **Application Default Credentials (ADC)** strategy, which is secure and flexible, avoiding the need for managing and storing API keys.

#### **A. Production Environment (GCP VM)**
- **Method**: A GCP Service Account is attached directly to the Compute Engine VM.
- **Process**: The application automatically acquires credentials from the VM's metadata server. No keys are stored in the environment.
- **Setup**:
    1. Create a Service Account in GCP.
    2. When creating the VM, attach this service account in the "Identity and API access" section.
    3. Grant the VM "Allow full access to all Cloud APIs" scope.
    4. Share the relevant Google Drive folders with the Service Account's email address.

#### **B. Local Development Environment**
- **Method**: Uses your personal user credentials via the `gcloud` CLI.
- **Process**: The application automatically finds credentials you've authorized locally.
- **Setup**:
    1. Install the `gcloud` CLI.
    2. Run `gcloud auth application-default login` in your terminal and follow the prompts.
    3. Share the relevant Google Drive folders with your personal Google account email.

### 2. Google Docs Mapping Strategy

The implementation uses **Option C: Folder-based Organization**.

- A root Google Drive folder contains sub-folders for `Articles`, `Topics`, and `Errors`.
- Each document within these folders corresponds to a single content item.
- Metadata (like `id`, `topicId`, `errorCode`) is stored in a **frontmatter** block at the top of each document.

### 3. Integration Components

#### A. Google Docs API Service Layer
**Location**: `/lib/google-docs-auth.ts`, `/lib/google-docs-parser.ts`, `/lib/google-docs.ts`

**Implemented Functions**:
```typescript
// Authentication
authenticateWithGoogle(): Promise<Auth.AuthClient>

// Document operations
parseGoogleDoc(auth: Auth.AuthClient, fileId: string): Promise<ParsedDocument>

// Batch operations
syncGoogleDocs(): Promise<void>
```

#### B. Webhook Handler (Future)
**Location**: `/app/api/webhooks/google-docs/route.ts` (stubbed)

#### C. Sync Service
**Location**: `/app/api/sync/google-docs/route.ts`
**Purpose**: A manually triggered, admin-only endpoint to sync all documents.
**Endpoint**: `POST /api/sync/google-docs`

### 4. Document Parsing Logic

- **Markdown Conversion**: Docs are exported as HTML via the Drive API, and the `turndown` library converts the HTML to Markdown.
- **Metadata**: A YAML "frontmatter" block (enclosed in `---`) at the top of each doc is parsed for metadata.

### 5. File Structure

```
gcp-cheatsheet/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts              # NextAuth.js configuration
│   │   ├── sync/
│   │   │   └── google-docs/
│   │   │       └── route.ts          # Manual sync endpoint
│   │   └── webhooks/
│   │       └── google-docs/
│   │           └── route.ts          # Webhook handler (Future)
│   └── ...
├── lib/
│   ├── google-docs-auth.ts           # Google authentication service (NEW)
│   ├── google-docs-parser.ts         # Document parsing service (NEW)
│   ├── google-docs.ts                # Main Google Docs service (NEW)
│   └── ...
└── ...
```

### 6. Environment Variables Needed

```env
# Folder IDs from Google Drive
GOOGLE_DOCS_TOPICS_FOLDER_ID=your_folder_id
GOOGLE_DOCS_ARTICLES_FOLDER_ID=your_folder_id
GOOGLE_DOCS_ERRORS_FOLDER_ID=your_folder_id

# Credentials for the site's admin panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Secret for NextAuth.js session encryption
# Generate with `openssl rand -base64 32`
NEXTAUTH_SECRET=your_generated_secret
```

### 7. Dependencies Added

```json
{
  "dependencies": {
    "googleapis": "^latest",
    "google-auth-library": "^latest",
    "turndown": "^latest",
    "js-yaml": "^latest"
  },
  "devDependencies": {
    "@types/turndown": "^latest",
    "@types/js-yaml": "^latest"
  }
}
```

### 8. Workflow

#### Initial Setup
1. Configure Application Default Credentials for your environment (local or production).
2. Set the required environment variables in `.env.local`.
3. Create the folder structure in Google Drive and share the folders.
4. Run the application and log in to the admin panel.
5. Trigger an initial sync by sending a `POST` request to `/api/sync/google-docs`.

### 9. Security

**Requirements**:
- **Secure Authentication**: The use of Application Default Credentials avoids storing secrets for the Google API.
- **Admin-only Sync**: The sync endpoint is protected and requires an authenticated admin user.
- **Webhook Security (Future)**: Webhook signature verification will be needed.

### 10. Unanswered Questions

The following questions from the original document will be relevant for future phases:

1. **Webhooks**: How to set up and verify Google Docs change notifications?
2. **Change Detection**: How to detect what changed in a document (not just that it changed)?
3. **Deployment**: How to handle webhook URLs in GCP deployment?

## Current App Context

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Data Storage**: JSON files (easily migratable to database)
- **Hosting Target**: Google Cloud Platform
- **Admin Panel**: NextAuth.js authentication
- **Content Format**: Markdown for articles and error resolutions

