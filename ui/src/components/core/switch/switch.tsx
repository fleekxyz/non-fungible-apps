import { Switch as SwitchHeadless } from '@headlessui/react';
import React from 'react';

import { SwitchStyles as S } from './switch.styles';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
  <SwitchHeadless
    as={S.Wrapper}
    checked={checked}
    onChange={onChange}
    isChecked={checked}
  >
    <S.Text checked={checked}>{checked ? 'Yes' : 'No'}</S.Text>
    <S.Dot checked={checked} />
  </SwitchHeadless>
);
