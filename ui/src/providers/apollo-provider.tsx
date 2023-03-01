import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';
import * as GraphClient from '@/../.graphclient';

const client = new ApolloClient({
  link: new GraphApolloLink(GraphClient),
  cache: new InMemoryCache(),
});

type ApolloProviderProps = {
  children: React.ReactNode;
};
export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};
