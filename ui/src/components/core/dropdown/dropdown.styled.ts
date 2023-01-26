import { dripStitches } from '../../../theme/stitches';
import * as Select from '@radix-ui/react-select';

const { styled } = dripStitches;

const StyledTrigger = styled(Select.Trigger, {
  display: 'inline-flex',
  width: 'fit-content',
  minWidth: '$40',
  height: '$11',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '$lg',
  p: '$3 $3h',
  fontSize: '$sm',
  lineHeight: '$none',
  color: '$slate11',
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderColor: '$slate7',
  borderWidth: '1px',
  outline: 'none',

  transition: 'border-color 0.2s ease-in-out',
  '&:hover': {
    borderColor: '$gray8',
  },
});

const StyledPortal = styled(Select.Portal, {
  left: '$1h',
  top: '$1h',
  width: 'fit-content',
  minWidth: '$40',
  borderStyle: 'solid',
  borderColor: '$slate7',
  borderWidth: '1px',
});

const StyledContent = styled(Select.Content, {
  position: 'absolute',
  overflow: 'none',
  backgroundColor: 'black',
  borderRadius: '$lg',
});

const StyledViewport = styled(Select.Viewport, {
  p: '$2 $3',
  color: '$slate11',
});

const StyledDropdownGroup = styled(Select.Group, { overflow: 'hidden' });

const StyledSeparator = styled(Select.Separator, {
  height: '1px',
  backgroundColor: '$slate6',
  mt: '$2',
});

const StyledItem = styled(Select.Item, {
  color: '$slate11',
  borderRadius: '$lg',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  p: '$2 $3h',
  position: 'relative',
  userSelect: 'none',
  mt: '$2',

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$slate5',
    color: '$slate12',
  },
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: 'relative',
  left: '$0',
  width: '$6',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$slate12',
});

export const StyledDropdownInput = styled('input', {
  border: 'none',
  backgroundColor: 'transparent',
  outline: 'none',
  color: '$slate12',
});

export const DropdownRoot = styled(Select.Root);
export const DropdownTrigger = StyledTrigger;
export const DropdownValue = Select.Value;
export const DropdownIcon = Select.Icon;
export const DropdownPortal = StyledPortal;
export const DropdownContent = StyledContent;
export const DropdownViewport = StyledViewport;
export const DropdownGroup = StyledDropdownGroup;
export const DropdownSeparator = StyledSeparator;
export const DopdownItem = StyledItem;
export const DropdownItemText = Select.ItemText;
export const DropdownItemIndicator = StyledItemIndicator;
