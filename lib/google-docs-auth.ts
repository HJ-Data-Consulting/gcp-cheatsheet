import { google } from 'googleapis';
import { Auth, GoogleAuth } from 'google-auth-library';

// Define the scopes required for Google Docs and Drive APIs
const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
];

/**
 * Authenticates with Google using Application Default Credentials.
 * This method is secure and flexible, working automatically in different environments:
 * 1. On a GCP VM, it uses the attached service account.
 * 2. Locally, it uses credentials from the `gcloud` CLI.
 *
 * @returns A promise that resolves with an authorized auth client.
 */
export async function authenticateWithGoogle(): Promise<Auth.AuthClient> {
  const auth = new GoogleAuth({
    scopes: SCOPES,
  });

  const authClient = await auth.getClient();
  return authClient;
}
