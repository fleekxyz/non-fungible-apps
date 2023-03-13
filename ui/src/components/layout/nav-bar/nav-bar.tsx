import { Logo } from '@/components/logo/logo';
import { NavBarStyles as Styles } from './nav-bar.styles';

export const NavBar: React.FC = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Logo />
      </Styles.Content>
    </Styles.Container>
  );
};
