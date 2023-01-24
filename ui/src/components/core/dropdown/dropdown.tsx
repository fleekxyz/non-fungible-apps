import { Flex } from '../../layout';
import { forwardRef, useState } from 'react';
import { Icon } from '../icon';
import {
  DopdownItem,
  DropdownContent,
  DropdownGroup,
  DropdownIcon,
  DropdownItemIndicator,
  DropdownItemText,
  DropdownPortal,
  DropdownRoot,
  DropdownSeparator,
  DropdownTrigger,
  DropdownValue,
  DropdownViewport,
  StyledDropdownInput,
} from './dropdown.styled';

type SelectItemProps = {
  withSearch?: boolean;
};

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <DopdownItem {...props} ref={forwardedRef}>
      <DropdownItemText>{children}</DropdownItemText>
      <DropdownItemIndicator>
        <Icon name="check" />
      </DropdownItemIndicator>
    </DopdownItem>
  );
});

export const Dropdown: React.FC<SelectItemProps> = (props: SelectItemProps) => {
  const { withSearch } = props;
  const [value, setValue] = useState('');

  return (
    <DropdownRoot value={value} onValueChange={setValue}>
      <DropdownTrigger
        css={{ ...(withSearch && !value && { justifyContent: 'flex-start' }) }}
      >
        {/* {withSearch ? (
          <>
            {!value && <Icon name="search" css={{ mr: '$1' }} />}
            <DropdownValue aria-label={value} placeholder="Search" />
          </>
        ) : ( */}
        <>
          {withSearch && !value && <Icon name="search" css={{ mr: '$1' }} />}
          <DropdownValue aria-label={value} placeholder="Select" />
          {(!withSearch || value) && (
            <DropdownIcon>
              <Icon name="chevron-down" />
            </DropdownIcon>
          )}
        </>
        {/* )} */}
      </DropdownTrigger>
      <DropdownPortal>
        <DropdownContent>
          <DropdownViewport>
            {withSearch && (
              <>
                <Flex css={{ ml: '$3h', mt: '$2' }}>
                  <Icon name="search" />
                  <StyledDropdownInput placeholder="Search..." />
                </Flex>
                <DropdownSeparator />
              </>
            )}
            <DropdownGroup>
              <SelectItem value="1">Item 1</SelectItem>
              <SelectItem value="2">Item 2</SelectItem>
              <SelectItem value="3">Item 3</SelectItem>
              <SelectItem value="4">Item 4</SelectItem>
              <SelectItem value="5">
                {
                  <Flex>
                    <Icon name="github" css={{ mr: '$2' }} />
                    <span>account</span>
                  </Flex>
                }
              </SelectItem>
            </DropdownGroup>
          </DropdownViewport>
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  );
};
