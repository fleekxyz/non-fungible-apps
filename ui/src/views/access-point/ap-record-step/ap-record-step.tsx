import { useEffect, useMemo } from 'react';

import {
  Button,
  Card,
  DisplayText,
  Grid,
  Icon,
  IconButton,
  SpinnerDot,
  Stepper,
  Text,
} from '@/components';
import { useAppDispatch } from '@/store';
import { bunnyCDNActions, useBunnyCDNStore } from '@/store/features/bunny-cdn';

import { useAccessPointFormContext } from '../ap-form-step';
import { CreateAccessPoint } from '../create-ap.context';
import { isSubdomain } from './record-step.utils';

export const APRecordStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bunnyURL, state } = useBunnyCDNStore();
  const {
    nfa: { domain: nfaDomain },
  } = CreateAccessPoint.useContext();
  const {
    form: {
      domain: {
        value: [accesPointDomain],
      },
    },
  } = useAccessPointFormContext();
  const { prevStep, nextStep } = Stepper.useContext();

  const isSudomain = useMemo(
    () => isSubdomain(accesPointDomain),
    [accesPointDomain]
  );

  useEffect(() => {
    if (state === 'success') {
      nextStep();
    }
  }, [state, nextStep]);

  const handleContinueClick = (): void => {
    dispatch(bunnyCDNActions.verifyAP(nfaDomain));
  };

  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Create Record"
        leftIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="back" />}
            css={{ mr: '$2' }}
            onClick={prevStep}
          />
        }
        rightIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body>
        {state === 'loading' ? (
          <Card.Text css={{ p: '$12 $10', gap: '$7' }}>
            <SpinnerDot css={{ fontSize: '$7xl' }} />
            <Text css={{ fontSize: '$md' }}>
              Waiting for DNS propagation, allow a few minutes.
            </Text>
          </Card.Text>
        ) : (
          <Grid
            css={{
              rowGap: '$6',
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
            <DisplayText label="Data (Points to)" value={bunnyURL} />
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={handleContinueClick}
            >
              I added the record
            </Button>
          </Grid>
        )}
      </Card.Body>
    </Card.Container>
  );
};
