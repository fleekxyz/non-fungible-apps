import { Button, Flex, Icon } from '@/components';

export const ColorPickerTest = () => {
  return (
    <Flex css={{ margin: '$22', gap: '$5', width: '$8' }}>
      <Button
        leftIcon={<Icon name="square" css={{ color: '#FFFFFF' }} />}
        rightIcon={<Icon name="chevron-down" css={{ fontSize: '0.625rem' }} />}
        css={{ py: '$1', height: '$5', borderRadius: '$md', color: '$slate12' }}
      >
        #FFFFFF
      </Button>
    </Flex>
  );
};
