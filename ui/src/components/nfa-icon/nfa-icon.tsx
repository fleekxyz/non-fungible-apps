import { NFAIconStyles as NS } from './nfa-icon.styles';

type NFAIconProps = {
  image: string;
  color: string;
};

export const NFAIcon: React.FC<NFAIconProps> = ({
  image,
  color,
}: NFAIconProps) => {
  return (
    <NS.Container css={{ backgroundColor: color }}>
      <NS.Image src={image} />
    </NS.Container>
  );
};
