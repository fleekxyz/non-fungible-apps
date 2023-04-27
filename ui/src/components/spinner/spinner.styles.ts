import { keyframes, styled } from '@/theme';

const DotSpinner = keyframes({
  '8.3%': {
    transform: 'rotate(30deg)',
  },
  '16.6%': {
    transform: 'rotate(60deg)',
  },
  '25%': {
    transform: 'rotate(90deg)',
  },
  '33.3%': {
    transform: 'rotate(120deg)',
  },
  '41.6%': {
    transform: 'rotate(150deg)',
  },
  '50%': {
    transform: 'rotate(180deg)',
  },
  '58.3%': {
    transform: 'rotate(210deg)',
  },
  '66.6%': {
    transform: 'rotate(240deg)',
  },
  '75%': {
    transform: 'rotate(270deg)',
  },
  '83.3%': {
    transform: 'rotate(300deg)',
  },
  '91.6%': {
    transform: 'rotate(330deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const SpinnerStyles = {
  KeyFrames: {},
  Container: styled('svg', {
    fontSize: '1.5rem',
    width: '1em',
    height: '1em',

    g: {
      transformOrigin: 'center',
      animation: `${DotSpinner} 0.75s step-end infinite`,
    },
  }),
};

export namespace SpinnerStyles {
  export type ContainerProps = React.ComponentProps<
    typeof SpinnerStyles.Container
  >;
}
