import { forwardRef } from 'react';

import { Flex, Icon } from '@/components';

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
} & React.ComponentProps<typeof Flex>;

export const RepoRow = forwardRef<HTMLDivElement, RepoRowProps>(
  ({ repo, button, ...props }, ref) => (
    <Flex
      {...props}
      ref={ref}
      css={{
        justifyContent: 'space-between',
        my: '$4',
        ...props.css,
      }}
    >
      <Flex css={{ alignItems: 'center' }}>
        <Icon name="github" css={{ fontSize: '$2xl', mr: '$2' }} />
        <span>{repo}</span>
      </Flex>
      {button}
    </Flex>
  )
);

RepoRow.displayName = 'RepoRow';
