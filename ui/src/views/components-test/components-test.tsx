import { useState } from 'react';

import { Flex, ResolvedAddress, Switch } from '@/components';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { SpinnerTest } from './spinner-test';
import { ToastTest } from './toast-test';

export const ComponentsTest: React.FC = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <SpinnerTest />
      <Switch checked={checked} onChange={setChecked} />
      <ResolvedAddress css={{ alignSelf: 'center' }}>
        {'0x7ed735b7095c05d78df169f991f2b7f1a1f1a049a'}
      </ResolvedAddress>
      <ComboboxTest />
      <ColorPickerTest />
      <ToastTest />
    </Flex>
  );
};
