import { Flex, ResolvedAddress } from '@/components';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';
import { SpinnerTest } from './spinner-test';

export const ComponentsTest: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <SpinnerTest />
      <ResolvedAddress css={{ alignSelf: 'center' }}>
        {'0x7ed735b7095c05d78df169f991f2b7f1a1f1a049a'}
      </ResolvedAddress>
      <ComboboxTest />
      <ColorPickerTest />
      <ToastTest />
    </Flex>
  );
};
