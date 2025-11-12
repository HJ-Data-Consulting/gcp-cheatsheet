# GCP Cheat Sheet

A comprehensive, searchable cheat sheet for Google Cloud Platform (GCP) services, including common errors and their solutions.

## Features

- **Public Pages**: Browse topics, articles, and common errors
- **Search**: Full-text search across all content using Fuse.js
- **Admin Panel**: Secure content management system with CRUD operations
- **Markdown Support**: Articles and error resolutions support Markdown formatting

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Search**: Fuse.js
- **Data Storage**: JSON files (easily migratable to database)

## Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and configure:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local`:
   - `NEXTAUTH_SECRET`: Generate a secure random string
   - `ADMIN_USERNAME`: Set your admin username
   - `ADMIN_PASSWORD`: Set your admin password

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
gcp-cheatsheet/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── articles/          # Article pages
│   ├── errors/            # Error pages
│   ├── search/            # Search results
│   ├── topics/            # Topic pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin components
│   └── providers/        # Context providers
├── data/                  # JSON data files
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/                # Static assets
```

## Admin Panel

Access the admin panel at `/admin/login`. Default credentials are:
- Username: `admin`
- Password: `admin`

**Important**: Change these credentials in production by setting environment variables.

## Data Models

### Topic
- `id`: Unique identifier
- `name`: Topic name
- `description`: Topic description

### Article
- `id`: Unique identifier
- `topicId`: Reference to topic
- `title`: Article title
- `content`: Markdown content
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### CommonError
- `id`: Unique identifier
- `service`: GCP service name
- `errorCode`: Error code
- `errorMessage`: Error message
- `resolution`: Markdown resolution guide
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Future Enhancements

- LLM-powered chat interface for natural language queries
- Database migration (PostgreSQL or serverless option)
- User authentication and personalized content
- Content versioning and history
- Export functionality (PDF, Markdown)

## License

ISC

