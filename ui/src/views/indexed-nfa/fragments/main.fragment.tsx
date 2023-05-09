import React, { useState } from 'react';

import Rectangle1 from '@/assets/Rectangle-199.png';
import Rectangle2 from '@/assets/Rectangle-200.png';
import Rectangle3 from '@/assets/Rectangle-201.png';
import { Combobox, Flex, ResolvedAddress, Text } from '@/components';

import { IndexedNFAStyles as S } from '../indexed-nfa.styles';

type SortItem = {
  value: string;
  label: string;
};

const orderResults: SortItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

const Header: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<SortItem>(orderResults[0]);

  const handleSortChange = (item: SortItem | undefined): void => {
    //TODO integrate with context and sort
    if (item) {
      setSelectedValue(item);
    }
  };
  return (
    <>
      <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <S.Main.Heading>Hosted NFAs</S.Main.Heading>
        <Combobox
          items={orderResults}
          selected={[selectedValue, handleSortChange]}
          css={{ minWidth: '$28' }}
          queryKey="label"
        >
          {({ Field, Options }) => (
            <>
              <Field
                css={{
                  backgroundColor: 'transparent',
                  borderColor: '$slate6',
                  color: '$slate11',
                }}
              >
                {(selected) => selected?.label || 'Select'}
              </Field>
              <Options disableSearch css={{ minWidth: '$44', left: 'unset' }}>
                {(item) => item.label}
              </Options>
            </>
          )}
        </Combobox>
      </Flex>
    </>
  );
};

const thumbnailMocks = [Rectangle1, Rectangle2, Rectangle3];
// TODO: replace mocks with fetched data
const apMocks = new Array(20).fill(0).map((_, index) => ({
  thumbnail:
    thumbnailMocks[
      Math.floor(
        Math.random() * (Math.floor(2) - Math.ceil(0) + 1) + Math.ceil(0)
      )
    ],
  domain: `domain${index}.com`,
  owner: '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
  createdAt: `${Math.floor(Math.random() * 30)}m ago`,
}));

const AccessPointsListFragment: React.FC = () => {
  //TODO add infinite scroll

  return (
    <S.Main.AccessPoint.List>
      {apMocks.map((item, index) => (
        <S.Main.AccessPoint.Grid key={index}>
          <S.Main.AccessPoint.Thumbnail>
            <img src={item.thumbnail} />
          </S.Main.AccessPoint.Thumbnail>
          <S.Main.AccessPoint.Data.Container>
            <S.Main.AccessPoint.Title>{item.domain}</S.Main.AccessPoint.Title>
            <Flex
              css={{ gap: '$2h', alignItems: 'center', textAlign: 'center' }}
            >
              <Text css={{ color: '$slate11' }}>
                <ResolvedAddress>{item.owner}</ResolvedAddress>
              </Text>
              <S.Main.Divider.Elipse />
              <Text css={{ color: '$slate11' }}>220 views</Text>
              <S.Main.Divider.Elipse />
              <Text css={{ color: '$slate11' }}>2 months ago</Text>
            </Flex>
          </S.Main.AccessPoint.Data.Container>
        </S.Main.AccessPoint.Grid>
      ))}
    </S.Main.AccessPoint.List>
  );
};

export const IndexedNFAMainFragment: React.FC = () => {
  return (
    <S.Main.Container>
      <Header />
      <AccessPointsListFragment />
    </S.Main.Container>
  );
};
