import { google } from "googleapis";
import path from 'path';

const keyFilePath = path.join(process.cwd(), 'credentials.json');

const googleAuthConfig = {
  type: "service_account",
  project_id: process.env.GOOGLE_PROJECT_ID,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLIENT_ID,
  auth_uri: process.env.GOOGLE_AUTH_URI,
  token_uri: process.env.GOOGLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
};
// authenticates the service account to be used in this context
const auth = new google.auth.GoogleAuth({
    // your credentials to authenticate
    credentials: googleAuthConfig,
    // the actions you are permissed to perform using this API, in this case
    // all CRUD operations are permissed, check out
    // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
    // for more advice on scopes
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  export const getData = async (query, mimeTypes, searchType = 'song') => {
    const drive = google.drive({ version: "v3", auth });
    try {
      let queryParts = [];

      if (searchType === 'artist') {
        // Search for folders matching the artist name
        queryParts.push(`name contains '${query}' and mimeType = 'application/vnd.google-apps.folder'`);
      } else {
        // Search for files matching the song name
        if (query) {
          queryParts.push(`name contains '${query}'`);
        }
        if (mimeTypes && mimeTypes.length) {
          const mimeTypeQuery = mimeTypes.map(type => `mimeType = '${type}'`).join(' or ');
          queryParts.push(`(${mimeTypeQuery})`);
        }
      }

      const fullQuery = queryParts.join(' and ');
      const res = await drive.files.list({
        q: fullQuery,
        fields: 'nextPageToken, files(id, name, mimeType, parents, webContentLink)'
      });
      const items = res.data.files;

      if (searchType === 'artist') {
        // Fetch files within the found folders
        const folderIds = items.map(folder => folder.id);
        const fileQueries = folderIds.map(id => `'${id}' in parents`).join(' or ');
        const fileRes = await drive.files.list({
          q: `(${fileQueries}) and (${mimeTypes.map(type => `mimeType = '${type}'`).join(' or ')})`,
          fields: 'nextPageToken, files(id, name, mimeType, parents, webContentLink)' // Include webContentLink here
        });
        return fileRes.data.files;
      }


      return items;
    } catch (error) {
      console.error("Error fetching files:", error.message);
      return null;
    }
  };