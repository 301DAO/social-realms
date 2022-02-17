import axios from 'axios';

export const fetchHeaders = async ({ url }: { url: string }) => {
  try {
    const response = await axios.head(url);
    if (response) {
      const mediaType = response.headers['content-type'];
      return mediaType;
    }
  } catch (error) {
    console.log(`error in lib/fetch-headers.ts: `, error instanceof Error ? error.message : error);
  }
  return null;
};
