import { env } from '@/constants';
import axios from 'axios';
import * as crypto from 'crypto';

const client = (body: string, endpoint: string) => {
  if (!env.bunnyCDN.feSigningKey) {
    throw new Error('Missing BunnyCDN signing key');
  }

  if (!env.bunnyCDN.url) {
    throw new Error('Missing BunnyCDN url');
  }

  const signature = generateSignature(body, env.bunnyCDN.feSigningKey);

  const instance = axios.create({
    baseURL: env.bunnyCDN.url,
    headers: {
      'lambda-signature': signature,
    },
  });

  return instance.post(endpoint, body);
};

const createPullzone = async (sourceDomain: string, targetDomain: string) => {
  try {
    const body = JSON.stringify({
      sourceDomain,
      targetDomain,
    });

    if (!env.bunnyCDN.createPullzone) {
      throw new Error('Missing BunnyCDN create pullzone endpoint');
    }

    const response = await client(body, env.bunnyCDN.createPullzone);

    return response.data.appInfo.appId;
  } catch (error) {
    throw error;
  }
};

const verifyPullzone = async (hostName: string) => {
  try {
    const body = JSON.stringify({
      hostName,
    });

    if (!env.bunnyCDN.verifyPullzone) {
      throw new Error('Missing BunnyCDN verify pullzone endpoint');
    }

    const response = await client(body, env.bunnyCDN.verifyPullzone);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const BunnyCDNClient = {
  createPullzone,
  verifyPullzone,
};

const generateSignature = (
  body: string, // must be raw string body, not json transformed version of the body
  signingKey: string // signing secret key for front-end
): string => {
  const hmac = crypto.createHmac('sha256', signingKey); // Create a HMAC SHA256 hash using the signing key
  hmac.update(body, 'utf8'); // Update the token hash with the request body using utf8
  return hmac.digest('hex');
};
