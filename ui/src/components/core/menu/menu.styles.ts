import { Menu } from '@headlessui/react';

import { styled } from '@/theme';

export const MenuStyles = {
  Wrapper: styled('div', {
    position: 'relative',
  }),
  Items: styled(Menu.Items, {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    border: '1px solid $slate6',
    backgroundColor: '$black',
    boxSizing: 'border-box',
    left: 0,
    right: 0,
    top: 'calc(100% + $3)',
    padding: '$3',
    gap: '$2',
    borderRadius: '$lg',
    zIndex: '$dropdown',
    maxHeight: '30vh',
    overflow: 'auto',
  }),
  Item: styled(Menu.Item, {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    cursor: 'pointer',
    padding: '$2 $3',
    borderRadius: '$lg',
    color: '$slate11',
    transition: '$all-200',
    fontSize: '$sm',

    '&[data-headlessui-state*="active"]': {
      backgroundColor: '$slate2',
      color: '$slate12',
    },
  }),
};
