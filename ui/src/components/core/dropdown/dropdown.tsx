import { Flex } from '../../layout';
import React, { forwardRef, useRef, useState } from 'react';
import { Icon, IconName } from '../icon';
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

export type DopdownItemProps = {
  value: string;
  label: string;
  icon?: IconName;
};

type DropdownProps = {
  withSearch?: boolean;
  selectedValue: string;
  onChange(value: string): void;
  items: DopdownItemProps[];
};

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <DopdownItem {...props} ref={forwardedRef}>
      <DropdownItemText>
        {
          <Flex css={{ flexDirection: 'row' }}>
            {children.icon && <Icon name={children.icon} css={{ mr: '$2' }} />}
            <span>{children.label}</span>
          </Flex>
        }
      </DropdownItemText>
      <DropdownItemIndicator>
        <Icon name="check" />
      </DropdownItemIndicator>
    </DopdownItem>
  );
});

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { withSearch, items, onChange, selectedValue } = props;
  const [searchValue, setSearchValue] = useState('');

  const timeOutRef = useRef<NodeJS.Timeout>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 500);
  };

  const handleDropdownChange = (value: string) => {
    onChange(value);
    setSearchValue('');
  };

  return (
    <DropdownRoot
      value={selectedValue ? selectedValue : undefined}
      onValueChange={(value: string) => handleDropdownChange(value)}
    >
      <DropdownTrigger
        css={{
          ...(withSearch && !selectedValue && { justifyContent: 'flex-start' }),
        }}
      >
        <>
          {withSearch && !selectedValue && (
            <Icon name="search" size="sm" css={{ mr: '$1' }} />
          )}
          <DropdownValue placeholder={withSearch ? 'Search' : 'Select'} />
          {(!withSearch || selectedValue) && (
            <DropdownIcon>
              <Icon name="chevron-down" />
            </DropdownIcon>
          )}
        </>
      </DropdownTrigger>
      <DropdownPortal
        css={{ ...(withSearch && !selectedValue && { left: '-$2' }) }}
      >
        <DropdownContent onCloseAutoFocus={() => setSearchValue('')}>
          <DropdownViewport>
            {withSearch && (
              <Flex css={{ flexDirection: 'column' }}>
                <Flex
                  css={{
                    ml: '$3h',
                    mt: '$2',
                    flexDirection: 'row',
                  }}
                >
                  <Icon name="search" size="sm" />
                  <StyledDropdownInput
                    id="search"
                    placeholder="Search..."
                    onChange={(e) => handleSearchChange(e)}
                  />
                </Flex>
                <DropdownSeparator />
              </Flex>
            )}
            <DropdownGroup>
              {items
                .filter(
                  (item) =>
                    item.label
                      .toUpperCase()
                      .indexOf(searchValue.toUpperCase()) != -1
                )
                .map((dropdownItem) => (
                  <SelectItem
                    key={dropdownItem.value}
                    value={dropdownItem.value}
                  >
                    {dropdownItem}
                  </SelectItem>
                ))}
            </DropdownGroup>
          </DropdownViewport>
        </DropdownContent>
      </DropdownPortal>
    </DropdownRoot>
  );
};
