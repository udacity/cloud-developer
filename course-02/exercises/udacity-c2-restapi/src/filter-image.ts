import { config } from './config/config';
import * as AWS from './aws';
import got from 'got/dist/source';

/**
 * Retrieves the image from S3 to filter it using filter service
 * and replaces the image
 * @param key name of file in s3 bucket
 * @param authorization to contact filteredimage service
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
