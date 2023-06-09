import { forwardStyledRef } from '@/theme';

import { TabsStyles as S } from './tabs.styles';

type TabProps = {
  label: string;
  index: number;
  onTabClick: (index: number) => void;
} & React.ComponentPropsWithRef<typeof S.Tab.Container>;

export const Tab = forwardStyledRef<HTMLDivElement, TabProps>(
  ({ label, index, onTabClick, ...props }, ref) => {
    const { active } = props;
    const handleClick = (): void => {
      onTabClick(index);
    };

    return (
      <S.Tab.Container ref={ref} {...props} onClick={handleClick}>
        <S.Tab.Label>{label}</S.Tab.Label>
        <S.Tab.Line active={active} />
      </S.Tab.Container>
    );
  }
);

type TabContainerProps = {
  children: React.ReactNode;
};

export const TabContainer: React.FC<TabContainerProps> = ({
  children,
}: TabContainerProps) => {
  return <S.Container>{children}</S.Container>;
};
