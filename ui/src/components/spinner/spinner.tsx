/* eslint-disable react/no-unknown-property */

import { SpinnerStyles } from './spinner.styles';

export const Spinner: React.FC<SpinnerStyles.ContainerProps> = (props) => (
  <SpinnerStyles.Container
    {...props}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="17"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="125.6"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="26.4;125.6;26.4"
        dur="4s"
        repeatCount="indefinite"
        keyTimes="0;0.5;1"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="1080 20 20"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </SpinnerStyles.Container>
);
