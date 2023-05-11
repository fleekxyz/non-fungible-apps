import { CustomCardHeader, Stepper } from '@/components';

export const APRecordCardHeader: React.FC = () => {
  const { prevStep } = Stepper.useContext();

  return (
    <CustomCardHeader.Default title="Create Record" onClickBack={prevStep} />
  );
};
