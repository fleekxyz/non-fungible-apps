import { dripStitches } from '../../../theme';

const { styled } = dripStitches;

export abstract class StepperStyles {
  static readonly Rail = styled('div', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.8rem',
    width: '100%',

    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      height: '1px',
      width: '100%',
      backgroundColor: '$border-default',
      zIndex: -1,
    },
  });

  static readonly RailDivision = styled('div', {
    height: '$2h',
    width: '$13',
    borderRadius: '$full',
    backgroundColor: '$slate6',
    '&[data-active="true"]': {
      backgroundColor: '$blue10',
    },
  });

  static readonly RailDivisionLabel = styled('span', {
    color: '$blue10',
    mt: '$3',
  });
}
