import { config, theme } from './themes';

config.theme.colors;
export const alphaColor = (
  color: keyof typeof theme.colors,
  value: number
): string =>
  config.theme.colors[color] +
  `00${Math.round(0xff * value).toString(16)}`.slice(-2);
