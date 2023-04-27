import { Link, useLocation } from 'react-router-dom';

import { forwardStyledRef } from '@/theme';

import { NavBarStyles as S } from './nav-bar.styles';

const Paths = [
  { path: '/explore', name: 'Explore', activeRegex: /\/$|\/explore/ },
  { path: '/mint', name: 'Create', activeRegex: /\/mint/ },
  { path: '/', name: 'Learn', activeRegex: /\/learn/ },
];

export const Navigation = forwardStyledRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof S.Navigation.Container>
>((props, ref) => {
  const location = useLocation();

  return (
    <S.Navigation.Container {...props} ref={ref}>
      {Paths.map(({ path, name, activeRegex }) => (
        <S.Navigation.Button
          key={path}
          as={Link}
          to={path}
          active={activeRegex.test(location.pathname)}
          variant="link"
          color="gray"
        >
          {name}
        </S.Navigation.Button>
      ))}
    </S.Navigation.Container>
  );
});
