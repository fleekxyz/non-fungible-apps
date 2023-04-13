import { Combobox as HeadlessCombobox } from '@headlessui/react';

import { dripStitches } from '@/theme';

import { Icon } from '../icon';
import { IconStyles } from '../icon/icon.styles';
import { InputStyled } from '../input';

const { styled } = dripStitches;

export const ComboboxStyles = {
  Wrapper: styled('div', {
    position: 'relative',

    variants: {
      unattached: {
        true: {
          position: 'static',
        },
      },
    },
  }),

  Option: styled(HeadlessCombobox.Option, {
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

    '&[data-headlessui-state*="selected"]': {
      backgroundColor: '$slate3',
    },

    '&[data-headlessui-state*="active"]': {
      backgroundColor: '$slate2',
      color: '$slate12',
    },
  }),

  Options: styled(HeadlessCombobox.Options, {
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
    zIndex: 10,
  }),

  Field: styled(HeadlessCombobox.Button, InputStyled, {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '$3',

    [`${IconStyles.Container}`]: {
      fontSize: '1.5em',
    },

    '&:focus-within': {
      outline: 'none',
      borderColor: '$blue9',

      [`${IconStyles.Container}`]: {
        color: '$slate12',
      },
    },

    '&:hover': {
      cursor: 'pointer',
    },
  }),

  Input: styled(HeadlessCombobox.Input, {
    width: '100%',
    color: '$slate11',
    backgroundColor: 'transparent',
    outline: 'none',
  }),

  SelectedIcon: styled(Icon, {
    position: 'absolute',
    right: '$3',
  }),

  Message: styled('span', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$2',
    color: '$slate8',
    fontStyle: 'italic',
  }),

  InnerSearchContainer: styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '$3',
    padding: '0 $2 $3 $2',
    borderBottom: '1px solid $slate6',

    [`${IconStyles.Container}`]: {
      fontSize: '1.5em',
      color: '$slate8',
    },

    'input::placeholder': {
      color: '$slate8',
    },
  }),
};
