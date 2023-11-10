import { google } from "googleapis";
import path from 'path';

const keyFilePath = path.join(process.cwd(), 'credentials.json');

// authenticates the service account to be used in this context
const auth = new google.auth.GoogleAuth({
    // your credentials to authenticate
    keyFile: keyFilePath,
    // the actions you are permissed to perform using this API, in this case
    // all CRUD operations are permissed, check out
    // [ https://developers.google.com/drive/api/guides/api-specific-auth ]
    // for more advice on scopes
    scopes: ["https://www.googleapis.com/auth/drive"],
  })

  export const getData = async (query, mimeTypes) => {
    const drive = google.drive({ version: "v3", auth });
    try {
      let queryParts = [];

      // Add search query if provided
      if (query) {
        queryParts.push(`name contains '${query}'`);
      }

      // Add MIME type query if provided
      if (mimeTypes && mimeTypes.length) {
        const mimeTypeQuery = mimeTypes.map(type => `mimeType = '${type}'`).join(' or ');
        queryParts.push(`(${mimeTypeQuery})`);
      }

      const fullQuery = queryParts.join(' and ');
      const res = await drive.files.list({
        q: fullQuery
      });
      const files = res.data.files;

      console.log('drive api response: ', files);
      return files;
    } catch (error) {
      console.error("Error fetching files:", error.message);
      return null;
    }
  };
