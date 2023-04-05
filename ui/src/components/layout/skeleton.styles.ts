import { dripStitches } from '@/theme';

const { styled, keyframes } = dripStitches;

const SkeletonKeyframes = keyframes({
  '0%': {
    opacity: '1',
  },
  '50%': {
    opacity: '0.5',
  },
  '100%': {
    opacity: '1',
  },
});

export const Skeleton = styled('div', {
  animation: `${SkeletonKeyframes} 1s ease-in-out infinite`,
  backgroundColor: '$slate6',
});
