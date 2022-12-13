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

type AccordtionProps = AccordionPanelProps & {
  children: React.ReactNode;
  heading: string;
};
export const AccordionItem = forwardRef<AccordtionProps, 'div'>(
  ({ children, heading, ...panelProps }, ref) => {
    return (
      <>
        <AccordionItemChakra>
          <h2>
            <AccordionButton borderBottomWidth="1px">
              <Box flex="1" textAlign="left">
                <Heading size="md"> {heading}</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel ref={ref} {...panelProps} pb={4} overflowY="scroll">
            {children}
          </AccordionPanel>
        </AccordionItemChakra>
      </>
    );
  }
);

