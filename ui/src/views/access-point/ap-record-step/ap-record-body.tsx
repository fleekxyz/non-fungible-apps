import { useEffect, useMemo } from 'react';

import { Button, Card, Flex, SpinnerDot, Stepper, Text } from '@/components';
import { bunnyCDNActions, useAppDispatch, useBunnyCDNStore } from '@/store';

import { useAccessPointFormContext } from '../ap-form-step';
import { DisplayText } from '../display-text';
import { isSubdomain } from './record-step.utils';

export const APRecordCardBody: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bunnyURL, state } = useBunnyCDNStore();

  const {
    form: {
      targetDomain: {
        value: [targetDomain],
      },
    },
  } = useAccessPointFormContext();
  const { nextStep } = Stepper.useContext();

  const isSudomain = useMemo(() => isSubdomain(targetDomain), [targetDomain]);

  useEffect(() => {
    if (state === 'success') {
      dispatch(bunnyCDNActions.setState(undefined));
      nextStep();
    }
  }, [state, nextStep, dispatch]);

  const handleContinueClick = (): void => {
    dispatch(bunnyCDNActions.verifyBunnyPullzone(targetDomain));
  };

  return (
    <Card.Body>
      {state === 'loading' ? (
        <Card.Text css={{ p: '$12 $10', gap: '$7' }}>
          <SpinnerDot css={{ fontSize: '$7xl' }} />
          <Text css={{ fontSize: '$md' }}>
            Waiting for DNS propagation, allow a few minutes.
          </Text>
        </Card.Text>
      ) : (
        <Flex
          css={{
            gap: '$6',
            flexDirection: 'column',
          }}
        >
          <Text>
            {`Create a ${
              isSudomain ? 'CNAME' : 'ANAME'
            } record in your DNS provider pointing to our CDN
              endpoint.`}
          </Text>
          <DisplayText
            label="Record Type"
            value={isSudomain ? 'CNAME' : 'ANAME'}
          />
          <DisplayText label="Host" value={isSudomain ? 'App' : '@'} />
          <DisplayText
            label="Data (Points to)"
            value={`${bunnyURL}.b-cdn.net`}
          />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={handleContinueClick}
          >
            I added the record
          </Button>
        </Flex>
      )}
    </Card.Body>
  );
};
