import { Button, ButtonProps } from '@/components';
import { forwardStyledRef } from '@/theme';

import { Icon, IconName } from '../../components/core/icon';

type ButtonConnectionProps = {
  icon: IconName;
  label: string;
} & Omit<ButtonProps, 'rightIcon' | 'leftIcon'>;

export const ButtonConnection = forwardStyledRef<
  HTMLButtonElement,
  ButtonConnectionProps
>(({ icon, label, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      size="lg"
      variant="ghost"
      css={{
        backgroundColor: '$slate4',
        color: '$slate12',
        justifyContent: 'space-between',
        py: '$2h',
      }}
      rightIcon={
        <Icon name={icon} css={{ color: 'white', fontSize: '$4xl' }} />
      }
    >
      {label}
    </Button>
  );
});
