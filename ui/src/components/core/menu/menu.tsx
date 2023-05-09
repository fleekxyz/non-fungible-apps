import { Menu as MenuHeadless } from '@headlessui/react';
import React from 'react';

import { forwardStyledRef } from '@/theme';

import { MenuStyles as MS } from './menu.styles';

export abstract class Menu {
  static readonly Root = ({ children }: Menu.MenuProps): JSX.Element => {
    return <MenuHeadless as={MS.Wrapper}>{children}</MenuHeadless>;
  };

  static readonly Items = forwardStyledRef<HTMLDivElement, Menu.ItemsProps>(
    ({ children, ...props }, ref): JSX.Element => {
      return (
        <MS.Items ref={ref} {...props}>
          {children.map((child, index) => (
            <MS.Item key={index}>{child}</MS.Item>
          ))}
        </MS.Items>
      );
    }
  );

  static readonly Button = MenuHeadless.Button;
}

export namespace Menu {
  export type ItemsProps = {
    children: React.ReactNode[];
  } & React.ComponentPropsWithRef<typeof MS.Items>;

  export type Elements = {
    Button: React.FC<React.ComponentPropsWithRef<typeof MenuHeadless.Button>>;
    Items: React.FC<ItemsProps>;
  };

  export type MenuProps = {
    children: React.ReactNode;
  } & React.ComponentPropsWithRef<typeof MS.Wrapper>;
}
