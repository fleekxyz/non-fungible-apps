import { Flex } from '@/components';
import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';

export const ComponentsTest = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <ColorPickerTest />
      <ToastTest />
      <ComboboxTest />
    </Flex>
  );
};
