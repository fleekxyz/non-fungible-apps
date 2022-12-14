import {
  AccordionItem as AccordionItemChakra,
  AccordionButton,
  Box,
  Heading,
  AccordionIcon,
  AccordionPanel,
  AccordionPanelProps,
  forwardRef,
} from '@chakra-ui/react';
import React from 'react';

type AccordionProps = AccordionPanelProps & {
  children: React.ReactNode;
  heading: string;
};
export const AccordionItem = forwardRef<AccordionProps, 'div'>(
  ({ children, heading, ...panelProps }, ref) => {
    return (
      <AccordionItemChakra>
        <AccordionButton borderBottomWidth="1px">
          <Box flex="1" textAlign="left">
            <Heading size="md"> {heading}</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel ref={ref} {...panelProps} pb={4} overflowY="scroll">
          {children}
        </AccordionPanel>
      </AccordionItemChakra>
    );
  }
);

