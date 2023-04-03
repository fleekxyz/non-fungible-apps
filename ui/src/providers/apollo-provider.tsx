import {
  ApolloClient,
  ApolloProvider as Provider,
  FieldMergeFunction,
  InMemoryCache,
} from '@apollo/client';
import { GraphApolloLink } from '@graphprotocol/client-apollo';
import React from 'react';

import * as GraphClient from '@/graphclient';

// https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-arrays-of-non-normalized-objects
const mergeByKey =
  (key: string): FieldMergeFunction =>
  (existing: any[] = [], incoming: any[], { mergeObjects, readField }) => {
    const merged: any[] = existing ? existing.slice(0) : [];
    const keyToIndex: Record<number, number> = Object.create(null);
    if (existing) {
      existing.forEach((token, index) => {
        const id = readField<number>(key, token) as number;
        keyToIndex[id] = index;
      });
    }
    incoming.forEach((token) => {
      const id = readField<number>(key, token) as number;
      const index = keyToIndex[id];
      if (typeof index === 'number') {
        merged[index] = mergeObjects(merged[index], token);
      } else {
        keyToIndex[id] = merged.length;
        merged.push(token);
      }
    });
    return merged;
  };

const client = new ApolloClient({
  link: new GraphApolloLink(GraphClient),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tokens: {
            keyArgs: false,
            merge: mergeByKey('id'),
          },
        },
      },
    },
  }),
});

type ApolloProviderProps = {
  children: React.ReactNode;
};
export const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};
