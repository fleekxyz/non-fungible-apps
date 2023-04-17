import { DisplayTextStyles as S } from './display-text.styles';
type DisplayTextProps = {
  label: string;
  value: string | React.ReactNode;
};

export const DisplayText: React.FC<DisplayTextProps> = ({ label, value }) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Input>{value}</S.Input>
    </S.Container>
  );
};
