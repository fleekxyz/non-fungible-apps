import { styled } from '@/theme';

const styles = {
  width: '100%',
  boxSizing: 'border-box',
  borderStyle: 'solid',
  minWidth: '$0',
  color: '$slate12',

  transition: 'border-color 0.2s ease-in-out',
  borderWidth: '$default',
  borderColor: '$slate7',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: '$gray8',
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$blue9',
  },
  '&[aria-invalid=true], &[data-invalid]': {
    borderColor: '$red9',
  },
  '&:disabled': {
    color: '$slate8',
    borderColor: '$slate6',
    backgroundColor: '$slate2',
    '&::placeholder': {
      color: '$slate8',
    },
  },
};

const variants = {
  variants: {
    size: {
      sm: {
        borderRadius: '$md',
        fontSize: '$xs',
        lineHeight: '$4',
        p: '$1h',
      },
      md: {
        borderRadius: '$lg',
        fontSize: '$sm',
        height: '$11',
        p: '$3 $3h',
      },
      lg: {
        borderRadius: '$xl',
        fontSize: '$md',
        p: '$4 $5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
};

export const InputStyled = styled('input', {
  all: 'unset',
  ...variants,
  ...styles,
});

export const InputGroupStyled = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '$2h',

  ...styles,

  variants: {
    size: {
      sm: {
        borderRadius: '$md',
        fontSize: '$xs',
        lineHeight: '$4',
      },
      md: {
        borderRadius: '$lg',
        fontSize: '$sm',
        height: '$11',
        px: '$3h',
      },
      lg: {
        borderRadius: '$xl',
        fontSize: '$md',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const InputGroupTextSyled = styled('input', {
  all: 'unset',
});

export const TextareaStyled = styled('textarea', {
  all: 'unset',
  ...variants,
  ...styles,
});
