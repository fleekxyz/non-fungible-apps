import { Flex } from '@/components';

import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';

export const ComponentsTest = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <ToastTest />
      <ComboboxTest />
    </Flex>
  );
};
