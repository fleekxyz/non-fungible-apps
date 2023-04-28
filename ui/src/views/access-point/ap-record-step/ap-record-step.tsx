import { Card } from '@/components';

import { APRecordCardBody } from './ap-record-body';
import { APRecordCardHeader } from './ap-record-header';

export const APRecordStep: React.FC = () => {
  return (
    <Card.Container css={{ maxWidth: '$107h' }}>
      <APRecordCardHeader />
      <APRecordCardBody />
    </Card.Container>
  );
};
