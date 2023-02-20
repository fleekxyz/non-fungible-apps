import { Flex } from '@/components';
import { DomainField } from './domain-field';
import { EnsField } from './ens-field';

export const EnsDomainField = () => (
  <Flex css={{ columnGap: '$4' }}>
    <EnsField />
    <DomainField />
  </Flex>
);
