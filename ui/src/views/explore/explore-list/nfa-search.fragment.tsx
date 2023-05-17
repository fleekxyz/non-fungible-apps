import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { Combobox, Flex, Icon, InputGroup, InputGroupText } from '@/components';
import { totalTokensDocument } from '@/graphclient';
import { useDebounce } from '@/hooks';
import { FleekERC721 } from '@/integrations/ethereum/contracts';
import { AppLog } from '@/utils';

import { Explore } from '../explore.context';
import { NFASearchFragmentStyles as S } from './nfa-search.styles';

type SortItem = {
  value: string;
  label: string;
};

const orderResults: SortItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Sort A-Z' },
  { value: 'z-a', label: 'Sort Z-A' },
];

export const NFASearchFragment: React.FC = () => {
  const {
    search,
    nfaView,
    setEndReached,
    setOrderBy,
    setOrderDirection,
    setSearch,
    setPageNumber,
    setNFAView,
  } = Explore.useContext();
  const [selectedValue, setSelectedValue] = useState<SortItem>(orderResults[0]);

  const { data: totalTokens } = useQuery(totalTokensDocument, {
    variables: {
      contractId: FleekERC721.address,
    },
    skip: Boolean(search),
  });

  const handleViewChange = (view: View): void => {
    setNFAView(view);
  };

  const handleSortChange = (item: SortItem | undefined): void => {
    if (item) {
      setSelectedValue(item);
      setPageNumber(0);
      setEndReached(false);

      switch (item.value) {
        case 'newest':
          setOrderBy('tokenId');
          setOrderDirection('desc');
          break;
        case 'oldest':
          setOrderBy('tokenId');
          setOrderDirection('asc');
          break;
        case 'a-z':
          setOrderBy('name');
          setOrderDirection('asc');
          break;
        case 'z-a':
          setOrderBy('name');
          setOrderDirection('desc');
          break;
        default:
          break;
      }
    } else {
      AppLog.errorToast('Error selecting sort option. Try again');
    }
  };

  const handleSearch = useDebounce(
    (searchValue: string) => setSearch(searchValue),
    200
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSearch(e.target.value);
  };

  return (
    <S.Container>
      <S.Data.Wrapper>
        {totalTokens?.collection && (
          <>
            <S.Data.Text>All NFAs&nbsp;</S.Data.Text>
            <S.Data.Number>
              ({totalTokens.collection.totalTokens})
            </S.Data.Number>
          </>
        )}
      </S.Data.Wrapper>

      <S.Flex>
        <S.Input.Wrapper>
          <InputGroup css={{ flex: 1 }}>
            <S.Input.Icon name="search" />
            <InputGroupText
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </InputGroup>
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
        </S.Input.Wrapper>

        {/* TODO move this to the app context */}
        <S.GridList.Wrapper>
          <S.GridList.Icon
            name="grid"
            selected={nfaView === 'grid'}
            css={{ btrr: '0', bbrr: '0' }}
            onClick={() => handleViewChange('grid')}
          />
          <S.GridList.Icon
            name="list"
            css={{ btlr: '0', bblr: '0' }}
            selected={nfaView === 'list'}
            onClick={() => handleViewChange('list')}
          />
        </S.GridList.Wrapper>
      </S.Flex>
    </S.Container>
  );
};
