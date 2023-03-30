import { IconStyles as IS } from '../icon.styles';

export const ChevronDownIcon: React.FC<IS.CustomProps> = (props) => (
  <IS.Custom
    {...props}
    viewBox="0 0 12 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.96967 0.21967C1.26256 -0.0732233 1.73744 -0.0732233 2.03033 0.21967L6 4.18934L9.96967 0.21967C10.2626 -0.0732233 10.7374 -0.0732233 11.0303 0.21967C11.3232 0.512563 11.3232 0.987437 11.0303 1.28033L6.53033 5.78033C6.23744 6.07322 5.76256 6.07322 5.46967 5.78033L0.96967 1.28033C0.676777 0.987437 0.676777 0.512563 0.96967 0.21967Z"
      fill="currentColor"
    />
  </IS.Custom>
);
