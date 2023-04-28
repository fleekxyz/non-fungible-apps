import { Flex, Spinner, SpinnerDot } from '@/components';

export const SpinnerTest: React.FC = () => {
  return (
    <>
      <Flex css={{ alignItems: 'center' }}>
        <SpinnerDot css={{ fontSize: '$6xl' }} />
        <SpinnerDot css={{ fontSize: '$4xl' }} />
        <SpinnerDot css={{ fontSize: '$lg' }} />
      </Flex>
      <Flex css={{ alignItems: 'center' }}>
        <Spinner css={{ fontSize: '$6xl' }} />
        <Spinner css={{ fontSize: '$4xl' }} />
        <Spinner css={{ fontSize: '$lg' }} />
      </Flex>
    </>
  );
};
