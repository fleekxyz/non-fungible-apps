import {
  AccordionItem as AccordionItemChakra,
  AccordionButton,
  Box,
  Heading,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  heading: string;
}
export const AccordionItem: React.FC<Props> = ({ children, heading }) => {
  return (
    <>
      <AccordionItemChakra>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading size="md"> {heading}</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} minH={120} overflowY="scroll">
          {children}
        </AccordionPanel>
      </AccordionItemChakra>
    </>
  );
};

