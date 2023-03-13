import { IconStyles as IS } from '../icon.styles';

export const FleekLogo: React.FC<IS.CustomProps> = (props) => (
  <IS.Custom
    {...props}
    viewBox="0 0 25 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g style="mix-blend-mode:overlay">
      <rect
        x="-0.762573"
        y="-0.871582"
        width="26.1501"
        height="40.4237"
        fill="url(#paint0_linear_406_12013)"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_406_12013"
        x1="14.7641"
        y1="3.21438"
        x2="6.75559"
        y2="36.7192"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFE702" />
        <stop offset="0.333333" stop-color="#FF3DCF" />
        <stop offset="0.661458" stop-color="#36DCFF" />
        <stop offset="0.854167" stop-color="#49F0A1" />
        <stop offset="1" stop-color="#58FF5A" />
      </linearGradient>
    </defs>
  </IS.Custom>
);
