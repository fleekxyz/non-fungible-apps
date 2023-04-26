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
        <h2 className="text-4xl">{header}</h2>
      </S.Indicator>
      {children}
    </S.Container>
  );
};
