import { Icon } from './icon';
import { styled } from '@stitches/react';
import { Flex } from '../../layout';

export default {
  title: 'Components/Icons',
  component: Icon,
};

const StoryFlex = styled(Flex, {
  display: 'flex',
  gap: '$2',
  flexWrap: 'wrap',
  color: 'white',
});

export const ConnectorIcons = () => (
  <StoryFlex>
    <Icon name="metamask" />
    <Icon name="github" />
    <Icon name="ethereum" />
  </StoryFlex>
);
