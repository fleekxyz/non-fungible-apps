import { Flex, Text } from '@/components';
import { styled } from '@/theme';

export const DisplayTextStyles = {
  Container: styled(Flex, {
    flexDirection: 'column',
  }),
  Label: styled('label', {
    color: '$slate11',
    mb: '$1h',

    fontSize: '$xs',
    //TODO add variants
  }),
  Input: styled(Text, {
    backgroundColor: '$slate1',
    borderColor: '$slate1',
    color: '$slate12',
    borderRadius: '$lg',
    fontSize: '$sm',
    height: '$11',
    p: '$3 $3h',
  }),
};
