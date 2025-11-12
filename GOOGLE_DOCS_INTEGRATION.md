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

## Proposed Integration Architecture

### 1. Google Docs Mapping Strategy

**Option A: One Doc per Content Item**
- Each Google Doc represents one Article, Topic, or Error
- Doc ID or URL maps to content ID
- Document title = content title
- Document body = content body

**Option B: Structured Master Document**
- One or more master Google Docs with structured sections
- Use headings/formatting to identify content types
- Parse document structure to extract multiple items

**Option C: Folder-based Organization**
- Google Drive folder structure mirrors content organization
- Each folder = Topic
- Each doc in folder = Article or Error

### 2. Integration Components Needed

#### A. Google Docs API Service Layer
**Location**: `/lib/google-docs.ts` (new file)

**Functions needed**:
```typescript
// Authentication
authenticateWithGoogleDocs(): Promise<GoogleAuth>

// Document operations
fetchDocument(docId: string): Promise<GoogleDoc>
parseDocumentToContent(doc: GoogleDoc, contentType: 'article' | 'error' | 'topic'): Content
watchDocument(docId: string, webhookUrl: string): Promise<WatchResponse>

// Batch operations
fetchAllDocuments(folderId?: string): Promise<GoogleDoc[]>
syncAllDocuments(): Promise<void>
```

#### B. Webhook Handler
**Location**: `/app/api/webhooks/google-docs/route.ts` (new file)

**Purpose**: Receive notifications when Google Docs are updated

**Endpoint**: `POST /api/webhooks/google-docs`

**Expected payload** (from Google):
```json
{
  "message": {
    "data": "base64-encoded-notification",
    "messageId": "string",
    "publishTime": "timestamp"
  },
  "subscription": "string"
}
```

**Handler logic**:
1. Decode notification
2. Extract document ID
3. Fetch updated document from Google Docs API
4. Parse document content
5. Update corresponding JSON file
6. Optionally trigger site rebuild/redeploy

#### C. Sync Service
**Location**: `/app/api/sync/google-docs/route.ts` (new file)

**Purpose**: Manual or scheduled sync of all documents

**Endpoint**: `POST /api/sync/google-docs`

**Query parameters**:
- `force`: boolean - Force sync even if no changes detected
- `type`: 'all' | 'topics' | 'articles' | 'errors' - Sync specific content type

#### D. Configuration
**Location**: `/lib/google-docs-config.ts` (new file)

**Configuration structure**:
```typescript
interface GoogleDocsConfig {
  // Document mappings
  documentMappings: {
    [docId: string]: {
      type: 'topic' | 'article' | 'error';
      contentId: string; // Maps to existing id in JSON
      topicId?: string; // For articles
    };
  };
  
  // Folder mappings (if using folder structure)
  folderMappings?: {
    [folderId: string]: {
      type: 'topic';
      topicId: string;
    };
  };
  
  // Webhook configuration
  webhookUrl: string;
  webhookSecret?: string;
}
```

**Storage**: Could be in:
- Environment variables (simple)
- JSON file: `/data/google-docs-mappings.json`
- Database (if migrated from JSON)

### 3. Document Parsing Logic

#### Markdown Conversion
Google Docs content needs to be converted to Markdown format for storage.

**Considerations**:
- Headers → Markdown headers (#, ##, ###)
- Bold/Italic → **bold**, *italic*
- Lists → Markdown lists
- Links → [text](url)
- Code blocks → ```code```
- Tables → Markdown tables (if supported)

**Library options**:
- `mammoth` - Convert .docx to HTML, then to Markdown
- `google-docs-to-markdown` - Direct conversion
- Custom parser using Google Docs API formatting

#### Content Type Detection
Need logic to determine if a document is:
- A Topic (short description)
- An Article (longer content, belongs to topic)
- An Error (has error code, service name, resolution)

**Detection methods**:
1. Document naming convention (e.g., "error-403-storage.md")
2. Document metadata/custom properties
3. Document structure (headings, sections)
4. Folder location

### 4. File Structure

```
gcp-cheatsheet/
├── app/
│   ├── api/
│   │   ├── webhooks/
│   │   │   └── google-docs/
│   │   │       └── route.ts          # Webhook handler
│   │   └── sync/
│   │       └── google-docs/
│   │           └── route.ts          # Manual sync endpoint
│   └── ...
├── lib/
│   ├── data.ts                       # Existing data layer
│   ├── google-docs.ts                # Google Docs API service (NEW)
│   ├── google-docs-config.ts         # Configuration (NEW)
│   └── google-docs-parser.ts         # Document parsing (NEW)
├── data/
│   ├── topics.json
│   ├── articles.json
│   ├── errors.json
│   └── google-docs-mappings.json     # Doc ID to content mapping (NEW)
└── ...
```

### 5. Environment Variables Needed

```env
# Google Docs API
GOOGLE_DOCS_CLIENT_ID=your-client-id
GOOGLE_DOCS_CLIENT_SECRET=your-client-secret
GOOGLE_DOCS_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_DOCS_REFRESH_TOKEN=your-refresh-token

# Webhook configuration
GOOGLE_DOCS_WEBHOOK_URL=https://your-domain.com/api/webhooks/google-docs
GOOGLE_DOCS_WEBHOOK_SECRET=your-webhook-secret

# Optional: Folder/document IDs
GOOGLE_DOCS_ROOT_FOLDER_ID=your-folder-id
GOOGLE_DOCS_MAPPINGS_FILE=./data/google-docs-mappings.json
```

### 6. Dependencies to Add

```json
{
  "dependencies": {
    "googleapis": "^latest",           // Google APIs client
    "@google-cloud/docs-parser": "...", // If available
    "turndown": "^latest",             // HTML to Markdown (if needed)
    "mammoth": "^latest"               // DOCX to HTML (if needed)
  }
}
```

### 7. Workflow

#### Initial Setup
1. Authenticate with Google Docs API
2. Set up document watching/webhooks
3. Create document mappings (doc ID → content ID)
4. Perform initial sync

#### Update Flow
1. User updates Google Doc
2. Google sends webhook notification
3. Webhook handler receives notification
4. Fetch updated document
5. Parse document content
6. Update corresponding JSON file
7. (Optional) Trigger site rebuild/redeploy

#### Sync Flow (Manual/Scheduled)
1. Fetch all documents from configured folders
2. Compare with current JSON data (by last modified time)
3. Update changed documents
4. Save to JSON files

### 8. Error Handling

**Considerations**:
- Handle API rate limits
- Retry logic for failed requests
- Logging for debugging
- Validation of parsed content
- Rollback mechanism if update fails
- Notification system for sync failures

### 9. Security

**Requirements**:
- Secure storage of OAuth credentials
- Webhook signature verification
- Rate limiting on webhook endpoint
- Admin-only access to sync endpoint
- Validation of document content before saving

### 10. Testing Strategy

**Test scenarios**:
- Document creation → Content creation
- Document update → Content update
- Document deletion → Content deletion (or archive)
- Multiple documents updated simultaneously
- Invalid document format handling
- API failure recovery
- Webhook replay attacks prevention

## Questions for Gemini Implementation

1. **Authentication**: What's the best OAuth flow for server-to-server Google Docs API access?
2. **Webhooks**: How to set up and verify Google Docs change notifications?
3. **Parsing**: Best approach to convert Google Docs format to Markdown?
4. **Rate Limits**: How to handle Google Docs API rate limits?
5. **Batch Operations**: How to efficiently sync multiple documents?
6. **Document Structure**: Recommended structure for organizing content in Google Docs?
7. **Change Detection**: How to detect what changed in a document (not just that it changed)?
8. **Deployment**: How to handle webhook URLs in GCP deployment?

## Current App Context

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Data Storage**: JSON files (easily migratable to database)
- **Hosting Target**: Google Cloud Platform
- **Admin Panel**: NextAuth.js authentication
- **Content Format**: Markdown for articles and error resolutions

