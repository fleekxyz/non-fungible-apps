import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Flex, Icon, NFAPreview } from '@/components';
import { parseNumberToHexColor } from '@/utils/color';

import { IndexedNFA } from '../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../indexed-nfa.styles';

const Preview: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  const color = useMemo(
    // TODO: replace with util function
    () => `#${parseNumberToHexColor(nfa.color)}`,
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

const CreateAccessPoint: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();
  return (
    <S.Aside.CreateAccessPoint.Container>
      <S.Aside.CreateAccessPoint.Heading>
        Host NFA Frontend
      </S.Aside.CreateAccessPoint.Heading>
      {/* TODO: replace with correct text */}

      <S.Aside.CreateAccessPoint.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae
        ante erat. Sed quis finibus diam.
      </S.Aside.CreateAccessPoint.Text>

      <Flex css={{ gap: '$3' }}>
        <Button as={Link} to={`/create-ap/${nfa.tokenId}`} colorScheme="blue">
          Host NFA Frontend
        </Button>
        <S.Aside.CreateAccessPoint.Extra href="">
          {/* TODO: place correct href */}
          Learn more
          <Icon name="chevron-right" />
        </S.Aside.CreateAccessPoint.Extra>
      </Flex>
    </S.Aside.CreateAccessPoint.Container>
  );
};

export const IndexedNFAAsideFragment: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>();

  useEffect(() => {
    setTop(ref.current?.getBoundingClientRect().top);
  }, [ref]);

  return (
    <S.Aside.Container ref={ref} css={{ top }}>
      <Preview />
      <CreateAccessPoint />
    </S.Aside.Container>
  );
};
