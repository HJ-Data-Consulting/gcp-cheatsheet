import TurndownService from 'turndown';
import { drive_v3, docs_v1 } from 'googleapis';
import { Auth } from 'google-auth-library';
import yaml from 'js-yaml';

const turndownService = new TurndownService();

interface ParsedDocument {
  metadata: Record<string, any>;
  content: string;
}

/**
 * Extracts frontmatter and content from an HTML string.
 * Assumes frontmatter is at the beginning, enclosed in ---
 */
function extractFrontmatter(htmlContent: string): ParsedDocument {
  const metadata: Record<string, any> = {};
  let content = htmlContent;

  // A simple regex to find frontmatter-like content at the start of the doc
  // It looks for content between <p>---</p> and <p>---</p>
  const frontmatterRegex = /^<p>---<\/p>\s*<p>([\s\S]*?)<\/p>\s*<p>---<\/p>/;

  const match = htmlContent.match(frontmatterRegex);

  if (match) {
    const yamlString = match[1].replace(/<br>/g, '\n');
    try {
      const parsedYaml = yaml.load(yamlString);
      if (typeof parsedYaml === 'object' && parsedYaml !== null) {
        Object.assign(metadata, parsedYaml);
      }
    } catch (e) {
      console.error('Error parsing YAML frontmatter:', e);
    }
    // Remove the frontmatter from the content
    content = htmlContent.substring(match[0].length).trim();
  }

  return { metadata, content };
}


/**
 * Fetches a Google Doc, converts it to Markdown, and parses its frontmatter.
 *
 * @param auth The authenticated auth client.
 * @param fileId The ID of the Google Doc file.
 * @returns A promise that resolves with the parsed document.
 */
export async function parseGoogleDoc(auth: Auth.AuthClient, fileId: string): Promise<ParsedDocument> {
  const drive = new drive_v3.Drive({ auth });

  // 1. Export the Google Doc as HTML
  const response = await drive.files.export(
    { fileId, mimeType: 'text/html' },
    { responseType: 'stream' }
  );
  
  const htmlContent = await streamToString(response.data);

  // 2. Extract frontmatter from the HTML
  const { metadata, content: htmlBody } = extractFrontmatter(htmlContent);

  // 3. Convert the remaining HTML body to Markdown
  const markdownContent = turndownService.turndown(htmlBody);

  return {
    metadata,
    content: markdownContent,
  };
}

// Helper to read a stream into a string
async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
}
