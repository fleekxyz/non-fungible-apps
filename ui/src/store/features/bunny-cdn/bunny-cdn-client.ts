import { env } from '@/constants';
import axios from 'axios';

axios.defaults.baseURL = env.bunnyCDN.url;
axios.defaults.headers.post['lambda-signature'] =
  env.bunnyCDN.alchemySignature;

const createPullzone = async (domain: string, targetDomain: string) => {
  const response = await axios.post('/create-pullzone', {
    domain,
    targetDomain,
  });

  return response.data;
};

const verifyPullzone = async (domain: string) => {
  const response = await axios.post('/verify-pullzone', {
    domain,
  });

  return response.data;
};

export const BunnyCDNClient = {
  createPullzone,
  verifyPullzone,
};


// export function generateSignature(
//   body: string, // must be raw string body, not json transformed version of the body
//   signingKey: string // signing secret key for front-end
// ): string {
//   const hmac = crypto.createHmac('sha256', signingKey); // Create a HMAC SHA256 hash using the signing key
//   hmac.update(body, 'utf8'); // Update the token hash with the request body using utf8
//   return hmac.digest('hex');
// }