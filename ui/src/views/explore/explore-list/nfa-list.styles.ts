import { Flex } from '@/components';
import { styled } from '@/theme';

export const NFAListFragmentStyles = {
  Container: styled(Flex, {
    flexWrap: 'wrap',
    gap: '$6',
    my: '$6',
    minHeight: '50vh',
    marginBottom: '30vh', // TODO: remove this if we add page footer
    alignItems: 'flex-start',
  }),
  EmptyMessage: styled('span', {
    padding: '$2 $3 $4 $3',
    textAlign: 'center',
    color: '$slate11',
    width: '100%',
  }),
};
