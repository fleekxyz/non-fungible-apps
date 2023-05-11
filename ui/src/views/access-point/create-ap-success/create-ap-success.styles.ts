import { CustomCardContainer } from '@/components';
import { keyframes, styled } from '@/theme';

const CardKeyFrames = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const CreateApSuccessStyles = {
  Container: styled(CustomCardContainer, {
    animation: `${CardKeyFrames} 0.5s ease-in-out 0s`,
  }),
};
