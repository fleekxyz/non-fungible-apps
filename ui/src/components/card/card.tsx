import React, { forwardRef } from 'react';
import { Flex } from '../layout';
import { CardStyles } from './card.styles';

export abstract class Card {
  static readonly Container = forwardRef<HTMLDivElement, Card.ContainerProps>(
    ({ children, ...props }, ref) => {
      return (
        <CardStyles.Container ref={ref} {...props}>
          {children}
        </CardStyles.Container>
      );
    }
  );

  static readonly Heading = forwardRef<HTMLHeadingElement, Card.HeadingProps>(
    ({ title, leftIcon, rightIcon, css, ...props }, ref) => {
      return (
        <Flex css={{ justifyContent: 'space-between', ...css }}>
          <Flex>
            {leftIcon}
            <CardStyles.Heading ref={ref} {...props}>
              {title}
            </CardStyles.Heading>
          </Flex>
          {rightIcon}
        </Flex>
      );
    }
  );

  static readonly Body = forwardRef<HTMLDivElement, Card.BodyProps>(
    ({ children, ...props }, ref) => {
      return (
        <CardStyles.Body ref={ref} {...props}>
          {children}
        </CardStyles.Body>
      );
    }
  );

  static readonly Text = forwardRef<HTMLDivElement, Card.CardTextProps>(
    ({ children, ...props }, ref) => {
      return (
        <CardStyles.Text {...props} ref={ref}>
          {children}
        </CardStyles.Text>
      );
    }
  );
}

export namespace Card {
  export type ContainerProps = React.ComponentProps<
    typeof CardStyles.Container
  >;

  export type HeadingProps = {
    title: string;
    css?: React.CSSProperties;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  } & React.ComponentProps<typeof CardStyles.Heading>;

  export type BodyProps = React.ComponentProps<typeof CardStyles.Body>;

  export type CardTextProps = React.ComponentProps<typeof CardStyles.Text>;
}
