/* eslint-disable @typescript-eslint/ban-types */
import { createStitches, DefaultThemeMap } from '@stitches/react';
import type { ConfigType } from '@stitches/react/types/config';

import { allToNegative } from '../../utils';
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

// export const {
//   styled,
//   css,
//   globalCss,
//   keyframes,
//   theme: darkTheme,
//   createTheme,
//   config,
// } = createStitches({
//   theme: {
//     colors: {
//       ...darkColors,
//     },
//     space: {
//       xs: '0.32rem',
//       sm: '0.625rem',
//       md: '1.25rem',
//       lg: '2.375rem',
//       xl: '4.75rem',
//     },
//     fontSizes: {
//       sm: '0.75rem',
//       md: '1rem',
//       lg: '1.75rem',
//       'h-sm': '1rem',
//       'h-md': '1.5rem',
//       'h-lg': '2rem',
//     },
//     radii: {
//       xs: '0.25rem',
//       sm: '0.5rem',
//       md: '0.75rem',
//       lg: '1rem',
//       xl: '1.5rem',
//       full: '9999px',
//     },
//     borderWidths: {
//       default: '1px',
//       focus: '2px',
//     },
//     borderStyles: {
//       default: 'solid',
//     },
//     utils: {},
//   },
//   media: {
//     sm: '(max-width: 640px)',
//     md: '(max-width: 850px)',
//     lg: '(max-width: 1140px)',
//     large: '(min-width: 1140px)',
//   },
// });
