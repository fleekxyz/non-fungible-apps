import { Flex, Text } from '@/components';
import { getDate } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

type HeaderDataProps = {
  label: string;
  children: React.ReactNode;
};

const HeaderData: React.FC<HeaderDataProps> = ({
  label,
  children,
}: HeaderDataProps) => (
  <Flex css={{ gap: '$2', fontSize: '14px', fontWeight: '400' }}>
    <Text css={{ color: '$slate11' }}>{label}</Text>
    <Text css={{ color: '$slate12' }}>{children}</Text>
  </Flex>
);

export const NFAInfo: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();
  return (
    <Flex css={{ alignItems: 'center', gap: '$2h' }}>
      <HeaderData label="Hosted NFAs">
        {nfa.accessPoints?.length ?? 0}
      </HeaderData>

      <S.Aside.Divider.Elipse />

      <HeaderData label="Created">{getDate(nfa.createdAt)}</HeaderData>
    </Flex>
  );
};
