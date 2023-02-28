import React from 'react';
import { Switch as SwitchComponent } from '@headlessui/react';

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => (
  <SwitchComponent
    checked={checked}
    onChange={onChange}
    className={`${checked ? 'bg-green4' : 'bg-red4'}
          relative inline-flex h-[32px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
  >
    <span
      className={`absolute top-1 ${
        checked ? 'right-3 text-green11' : 'text-red11 left-4'
      }`}
    >
      {checked ? 'Yes' : 'No'}
    </span>
    <span
      aria-hidden="true"
      className={`${
        checked ? 'bg-green11 translate-x-0' : 'bg-red11 translate-x-[2.625rem]'
      }
            absolute top-1 left-1 pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
    />
  </SwitchComponent>
);
