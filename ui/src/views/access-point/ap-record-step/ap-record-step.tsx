import { MintCardContainer } from '@/views/mint/mint-card';

import { APRecordCardBody } from './ap-record-body';
import { APRecordCardHeader } from './ap-record-header';

export const APRecordStep: React.FC = () => {
  return (
    <MintCardContainer>
      <APRecordCardHeader />
      <APRecordCardBody />
    </MintCardContainer>
  );
};
