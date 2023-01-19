import { styled } from '@stitches/react';
import {
  IoArrowBackCircleSharp,
  IoInformationCircleSharp,
} from 'react-icons/io5';
import { Flex } from '../../layout';
import { Button } from './button';
import { IconButton } from './icon-button';
import { Icon as IconComponent } from '../icon';

export default {
  title: 'Components/Button',
  component: Button,
};

const StoryFlex = styled(Flex, {
  display: 'flex',
  gap: '$2',
  flexWrap: 'wrap',
});

export const Default = () => (
  <StoryFlex>
    <Button colorScheme="blue">Primary</Button>
    <Button>Default</Button>
  </StoryFlex>
);
export const Icon = () => (
  <>
    <IconButton
      aria-label="Add"
      colorScheme="gray"
      variant="link"
      icon={<IconComponent name="info" />}
    />
    <IconButton
      aria-label="Add"
      colorScheme="gray"
      variant="link"
      icon={<IconComponent name="back" />}
    />
  </>
);

export const ConnectorButtons = () => (
  <StoryFlex>
    <Button
      size="lg"
      iconSpacing="40"
      variant="ghost"
      rightIcon={<IconComponent name="github" css={{ color: 'white' }} />}
    >
      GitHub
    </Button>
    <Button
      disabled
      size="lg"
      iconSpacing="40"
      variant="ghost"
      rightIcon={<IconComponent name="github" css={{ color: 'white' }} />}
    >
      GitHub
    </Button>
    <Button
      size="lg"
      iconSpacing="40"
      variant="ghost"
      rightIcon={<IconComponent name="ethereum" />}
    >
      Connect Ethereum Wallet
    </Button>
    <Button
      disabled
      size="lg"
      iconSpacing="40"
      variant="ghost"
      rightIcon={<IconComponent name="ethereum" />}
    >
      Connect Ethereum Wallet
    </Button>
  </StoryFlex>
);
