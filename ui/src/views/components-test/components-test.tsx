import { Flex } from '@/components';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';
import { SpinnerTest } from './spinner-test';

export const ComponentsTest: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <SpinnerTest />
      <ComboboxTest />
      <ColorPickerTest />
      <ToastTest />
    </Flex>
  );
};
