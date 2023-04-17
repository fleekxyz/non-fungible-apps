import { Flex } from '@/components';

import { DomainField } from './domain-field';
import { EnsField } from './ens-field';

export const EnsDomainField: React.FC = () => (
  <Flex css={{ columnGap: '$4', position: 'relative' }}>
    <EnsField />
    <DomainField />
  </Flex>
);
