import { parseNumberToHexColor } from '@/utils/color';
import { NFAIconStyles as NS } from './nfa-icon.styles';

type NFAIconProps = {
  image: string;
  color: number;
};

export const NFAIcon: React.FC<NFAIconProps> = ({ image, color }) => {
  return (
    <NS.Container
      css={{ backgroundColor: `#${parseNumberToHexColor(color)}57` }}
    >
      <NS.Image src={image} />
    </NS.Container>
  );
};
