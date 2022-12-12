import { isValidImageUrl, isValidUrl } from '@/utils';
import { ethers } from 'ethers';
import { FormikValues } from 'formik';

export const validateFields = (values: FormikValues) => {
  const errors: FormikValues = {};
  if (!values.name) {
    errors.name = 'Name cannot be empty';
  }
  if (!values.description) {
    errors.description = 'Description cannot be empty';
  }
  if (!values.githubCommit) {
    errors.githubCommit = 'Github commit cannot be empty';
  } else if (!isValidUrl(values.githubCommit)) {
    errors.githubCommit = 'Github commit is not a valid url';
  }
  if (!values.ownerAddress) {
    errors.ownerAddress = 'Owner address cannot be empty';
  } else if (!ethers.utils.isAddress(values.ownerAddress)) {
    errors.ownerAddress = 'Owner address is not a valid address';
  }
  if (!values.externalUrl) {
    errors.externalUrl = 'External url cannot be empty';
  } else if (!isValidUrl(values.externalUrl)) {
    errors.externalUrl = 'External url is not a valid url';
  }
  if (!values.image) {
    errors.image = 'Image cannot be empty';
  } else if (!isValidImageUrl(values.image)) {
    errors.image = 'Image url is not a valid url';
  }
  //TODO check if ENS is a valid ens name
  return errors;
};

