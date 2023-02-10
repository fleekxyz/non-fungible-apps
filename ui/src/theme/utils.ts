import Stitches from '@stitches/react';

export const utils = {
  p: (value: Stitches.PropertyValue<'padding'>) => ({
    padding: value,
  }),
  pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
  }),
  pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
    paddingRight: value,
  }),
  pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
    paddingBottom: value,
  }),
  pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
  }),
  px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
    paddingLeft: value,
    paddingRight: value,
  }),
  py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
    paddingTop: value,
    paddingBottom: value,
  }),

  m: (value: Stitches.PropertyValue<'margin'>) => ({
    margin: value,
  }),
  mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
  }),
  mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
    marginRight: value,
  }),
  mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
    marginBottom: value,
  }),
  ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
  }),
  mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
    marginLeft: value,
    marginRight: value,
  }),
  my: (value: Stitches.PropertyValue<'marginTop'>) => ({
    marginTop: value,
    marginBottom: value,
  }),

  br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
    borderRadius: value,
  }),
  btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
    borderTopRightRadius: value,
  }),
  bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
    borderBottomRightRadius: value,
  }),
  bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
    borderBottomLeftRadius: value,
  }),
  btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
    borderTopLeftRadius: value,
  }),
  bt: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
    borderTopLeftRadius: value,
    borderTopRightRadius: value,
  }),
  bb: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
    borderBottomRightRadius: value,
    borderBottomLeftRadius: value,
  }),

  ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
  oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

  userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
    WebkitUserSelect: value,
    userSelect: value,
  }),

  size: (value: Stitches.PropertyValue<'width'>) => ({
    width: value,
    height: value,
  }),

  appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
    WebkitAppearance: value,
    appearance: value,
  }),
  backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
    WebkitBackgroundClip: value,
    backgroundClip: value,
  }),
};
