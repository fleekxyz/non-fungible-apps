import { useMemo } from 'react';

import { NFAPreview } from '@/components';
import { parseNumberToHexColor } from '@/utils/color';

import { IndexedNFA } from '../../indexed-nfa.context';

export const Preview: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const color = useMemo(
    () => `#${parseNumberToHexColor(nfa.color ?? '')}`,
    [nfa]
  );

  return (
    <NFAPreview
      color={color}
      logo={nfa.logo}
      ens={nfa.ENS}
      name={nfa.name}
      size="100%"
      css={{
        borderRadius: '$lg',
        border: '1px solid $slate6',
      }}
    />
  );
};
