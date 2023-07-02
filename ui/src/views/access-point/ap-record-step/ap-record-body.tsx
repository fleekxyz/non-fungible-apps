import { useEffect, useMemo } from 'react';

import { Button, Card, Flex, SpinnerDot, Stepper, Text } from '@/components';
import { bunnyCDNActions, useAppDispatch, useBunnyCDNStore } from '@/store';

import { CreateAccessPoint } from '../create-ap.context';
import { DisplayText } from '../display-text';
import { isSubdomain } from './record-step.utils';

export const APRecordCardBody: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bunnyURL, state } = useBunnyCDNStore();
  const {
    form: {
      domain: {
        value: [accessPointDomain],
      },
    },
  } = CreateAccessPoint.useFormContext();
  const { nextStep } = Stepper.useContext();

  const subdomain = useMemo(
    () => isSubdomain(accessPointDomain),
    [accessPointDomain]
  );

  useEffect(() => {
    if (state === 'success') {
      dispatch(bunnyCDNActions.setState(undefined));
      nextStep();
    }
  }, [state, nextStep, dispatch]);

  const handleContinueClick = (): void => {
    dispatch(bunnyCDNActions.verifyBunnyPullzone(accessPointDomain));
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
              subdomain ? 'CNAME' : 'ANAME'
            } record in your DNS provider pointing to our CDN
              endpoint.`}
          </Text>
          <DisplayText
            label="Record Type"
            value={subdomain ? 'CNAME' : 'ANAME'}
          />
          <DisplayText label="Host" value={subdomain ? 'App' : '@'} />
          <DisplayText label="Data (Points to)" value={bunnyURL} />
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
