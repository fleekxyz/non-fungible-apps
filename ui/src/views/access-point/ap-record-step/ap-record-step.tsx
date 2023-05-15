import { CustomCardContainer } from '@/components';

import { APRecordCardBody } from './ap-record-body';
import { APRecordCardHeader } from './ap-record-header';

export const APRecordStep: React.FC = () => {
  return (
    <CustomCardContainer>
      <APRecordCardHeader />
      <APRecordCardBody />
    </CustomCardContainer>
  );
};
