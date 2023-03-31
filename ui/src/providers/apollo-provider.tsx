import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';
import React from 'react';

import * as GraphClient from '@/graphclient';

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
