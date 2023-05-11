import { styled } from '@/theme';

export abstract class SpinnerStyles {
  static readonly Container = styled('svg', {
    fontSize: '1.5rem',
    width: '1em',
    height: '1em',
  });
}

export namespace SpinnerStyles {
  export type ContainerProps = React.ComponentProps<
    typeof SpinnerStyles.Container
  >;
}
