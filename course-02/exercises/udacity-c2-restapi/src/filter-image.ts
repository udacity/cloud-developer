import { config } from './config/config';
import * as AWS from './aws';
import got from 'got/dist/source';

/**
 * 
 * @param key 
 * @param authorization 
 */
export async function filterImage(key: string, authorization: string): Promise<string> {
  console.log(`Filtering image ${key}`);

  const imageUrl = AWS.getGetSignedUrl(key);

  try {
    const filteredImagePromise = got(`${config.dev.filteredImageUrl}`, { searchParams: { image_url: imageUrl }, headers: { Authorization: authorization } });

    const fileBuffer = await filteredImagePromise.buffer()
    const filteredImage = await filteredImagePromise;

    await AWS.putObject(
      key,
      fileBuffer,
      filteredImage.headers['content-type'],
      filteredImage.headers['content-encoding']
    );
    return key;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to filter image');
  }
}

function paramsToObject(entries: any) {
  const result = {}
  for (const [key, value] of entries) {
    // @ts-ignore
    result[key] = value;
  }
  return result;
}
