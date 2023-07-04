import { env } from '@/constants';
import { AppLog } from '@/utils';
import axios from 'axios';
import * as crypto from 'crypto';

axios.defaults.baseURL = env.bunnyCDN.url;

const createPullzone = async (sourceDomain: string, targetDomain: string) => {
  try {
    const body = JSON.stringify({
      sourceDomain,
      targetDomain,
    });

    if (!env.bunnyCDN.feSigningKey) {
      AppLog.error('Missing BunnyCDN signing key');
      throw new Error();
    }

    const signature = generateSignature(body, env.bunnyCDN.feSigningKey);

    const response = await axios.post('/app', body, {
      headers: {
        'lambda-signature': signature,
      },
    });

    //TODO show the user that the pullzone name is already taken
    return response.data.appInfo.apId;
  } catch (error) {
    throw error;
  }
};

const verifyPullzone = async (hostName: string) => {
  try {
    const body = JSON.stringify({
      hostName,
    });

    if (!env.bunnyCDN.feSigningKey) {
      AppLog.error('Missing BunnyCDN signing key');
      throw new Error();
    }

    const signature = generateSignature(body, env.bunnyCDN.feSigningKey);

    const response = await axios.post('/verifyApp', body, {
      headers: {
        'lambda-signature': signature,
      },
    });

    console.log(response.data);
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
