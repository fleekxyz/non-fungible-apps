import { SpinnerStyles } from './spinner.styles';

export const SpinnerDot: React.FC<SpinnerStyles.ContainerProps> = (props) => {
  return (
    <SpinnerStyles.Container
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="12" cy="2.5" r="1" opacity=".14" fill="#FFFFFF" />
        <circle cx="16.75" cy="3.77" r="1" opacity=".29" fill="#FFFFFF" />
        <circle cx="20.23" cy="7.25" r="1" opacity=".43" fill="#FFFFFF" />
        <circle cx="21.50" cy="12.00" r="1" opacity=".57" fill="#FFFFFF" />
        <circle cx="20.23" cy="16.75" r="1" opacity=".71" fill="#FFFFFF" />
        <circle cx="16.75" cy="20.23" r="1" opacity=".86" fill="#FFFFFF" />
        <circle cx="12" cy="21.5" r="1" fill="#FFFFFF" />
      </g>
    </SpinnerStyles.Container>
  );
};
