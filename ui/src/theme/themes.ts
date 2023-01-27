/* eslint-disable @typescript-eslint/ban-types */
import { createStitches, DefaultThemeMap } from '@stitches/react';
import type { ConfigType } from '@stitches/react/types/config';

import { allToNegative } from '../utils';
import {
  colors,
  darkColors,
  media as libMedia,
  radii,
  shadows,
  sizes,
  spacing,
  typography,
  zIndices,
} from './foundations';
import { utils as libUtils } from './utils';

export interface CreateDripStitchesConfig<
  Prefix,
  Media,
  Theme,
  ThemeMap,
  Utils
> {
  prefix?: ConfigType.Prefix<Prefix>;
  media?: ConfigType.Media<Media>;
  theme?: ConfigType.Theme<Theme>;
  themeMap?: ConfigType.ThemeMap<ThemeMap>;
  utils?: ConfigType.Utils<Utils>;
}
export const createDripStitches = <
  Prefix extends string = '',
  Media extends {} = {},
  Theme extends {} = {},
  ThemeMap extends {} = DefaultThemeMap,
  Utils extends {} = {}
>(
  config?: CreateDripStitchesConfig<Prefix, Media, Theme, ThemeMap, Utils>
) => {
  const { prefix, theme, themeMap, utils, media } = config || {};

  const _spacing = {
    ...allToNegative(spacing),
    ...spacing,
  };

  const _sizes = {
    ...allToNegative(sizes),
    ...sizes,
  };

  const { createTheme, ...otherStitches } = createStitches({
    prefix: prefix || ('drip' as string),
    media: {
      ...libMedia,
      ...(media || {}),
    },
    theme: {
      colors: {
        ...darkColors, // TODO: replace with light colors once it's done the light mode
        ...(theme?.colors || {}),
      },
      borderWidths: {
        default: '1px',
      },
      space: {
        ..._spacing,
        ...(theme?.space || {}),
      },
      sizes: {
        ..._sizes,
        ...(theme?.sizes || {}),
      },
      fontWeights: {
        ...typography.fontWeights,
        ...(theme?.fontWeights || {}),
      },
      fonts: {
        ...typography.fonts,
        ...(theme?.fonts || {}),
      },
      letterSpacings: {
        ...typography.letterSpacings,
        ...(theme?.letterSpacings || {}),
      },
      lineHeights: {
        ...typography.lineHeights,
        ...(theme?.lineHeights || {}),
      },
      fontSizes: {
        ...typography.fontSizes,
        ...(theme?.fontSizes || {}),
      },
      radii: {
        ...radii,
        ...(theme?.radii || {}),
      },
      shadows: {
        ...shadows,
        ...(theme?.shadows || {}),
      },
      zIndices: {
        ...zIndices,
        ...(theme?.zIndices || {}),
      },
      transitions: {
        'all-200': 'all 200ms',
        ...(theme?.transitions || {}),
      },
      ...(theme || {}),
    },
    themeMap,
    utils: {
      ...libUtils,
      ...(utils || {}),
    },
  });

  const darkTheme = createTheme({
    colors: darkColors,
  });

  return {
    createTheme,
    darkTheme,
    darkThemeSelector: `.${darkTheme} &`,
    ...otherStitches,
  };
};

export const dripStitches = createDripStitches();
