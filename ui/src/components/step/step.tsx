import { Stepper } from '@/components';

import { StepStyles as S } from './step.styles';

type StepProps = {
  children: React.ReactNode;
  header: string;
};

export const Step: React.FC<StepProps> = ({ children, header }: StepProps) => {
  return (
    <S.Container>
      <S.Indicator>
        <Stepper.Indicator />
        <S.Text>{header}</S.Text>
      </S.Indicator>
      {children}
    </S.Container>
  );
};
