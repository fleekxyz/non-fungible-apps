import { forwardStyledRef } from '@/theme';

import { RowDataStyles as S } from './row-data.styles';

type RowDataProps = {
  leftIcon: React.ReactNode;
  label: string;
  rightComponent: React.ReactNode;
  onClick?: () => void;
};

export const RowData = forwardStyledRef<HTMLDivElement, RowDataProps>(
  ({ leftIcon, label, rightComponent, onClick, ...props }, ref) => {
    const handleOnClick = (): void => {
      if (onClick) onClick();
    };

    return (
      <S.Container ref={ref} {...props} onClick={handleOnClick}>
        <S.Text.Container>
          {leftIcon}
          <S.Text.Label>{label}</S.Text.Label>
        </S.Text.Container>
        {rightComponent}
      </S.Container>
    );
  }
);

RowData.displayName = 'RowData';
