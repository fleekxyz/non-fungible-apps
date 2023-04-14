import { Flex } from '@/components';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';

export const ComponentsTest: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <ComboboxTest />
      <ColorPickerTest />
      <ToastTest />
    </Flex>
  );
};
