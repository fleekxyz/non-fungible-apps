import { env } from '@/constants';
import axios from 'axios';

axios.defaults.baseURL = env.bunnyCDN.url;
axios.defaults.headers.post['X-Alchemy-Signature'] =
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

