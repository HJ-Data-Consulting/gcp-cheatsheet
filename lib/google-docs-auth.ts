import { google } from 'googleapis';
import { Auth, GoogleAuth, OAuth2Client } from 'google-auth-library';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Define the scopes required for Google Docs and Drive APIs
const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/documents.readonly',
];

function getADC() {
  const adcPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    path.join(os.homedir(), '.config', 'gcloud', 'application_default_credentials.json');

  if (fs.existsSync(adcPath)) {
    try {
      const adc = JSON.parse(fs.readFileSync(adcPath, 'utf-8'));
      return adc;
    } catch (e) {
      console.error(`Error reading or parsing ADC file at ${adcPath}`, e);
      return null;
    }
  }
  return null;
}

/**
 * Authenticates with Google using Application Default Credentials.
 * This method is secure and flexible, working automatically in different environments:
 * 1. On a GCP VM, it uses the attached service account.
 * 2. Locally, it uses credentials from the `gcloud` CLI.
 *
 * This implementation adds a specific path for local development to avoid issues
 * where the auth library incorrectly detects a GCE environment.
 *
 * @returns A promise that resolves with an authorized auth client.
 */
export async function authenticateWithGoogle(): Promise<Auth.AuthClient> {
  // In non-production environments, try to use local ADC directly.
  // This avoids an issue where the auth library can incorrectly detect a GCE
  // environment and fail to get credentials.
  if (process.env.NODE_ENV !== 'production') {
    const adc = getADC();
    if (adc && adc.type === 'authorized_user') {
      const client = new OAuth2Client(adc.client_id, adc.client_secret);
      client.setCredentials({ refresh_token: adc.refresh_token });
      return client;
    }
  }

  // Default behavior for production or if local ADC is not a user credential.
  const auth = new GoogleAuth({
    scopes: SCOPES,
  });

  const authClient = await auth.getClient();
  return authClient;
}
