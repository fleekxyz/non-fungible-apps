// @ts-nocheck
import {
  GraphQLResolveInfo,
  SelectionSetNode,
  FieldNode,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from '@graphql-mesh/cache-localforage';
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from '@graphql-mesh/graphql';
import BareMerger from '@graphql-mesh/merger-bare';
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import {
  getMesh,
  ExecuteMeshFn,
  SubscribeMeshFn,
  MeshContext as BaseMeshContext,
  MeshInstance,
} from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { FleekNfaTypes } from './sources/FleekNFA/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Approval = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  approved: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll = {
  id: Scalars['Bytes'];
  owner: Scalars['Bytes'];
  operator: Scalars['Bytes'];
  approved: Scalars['Boolean'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ApprovalForAll_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  operator?: InputMaybe<Scalars['Bytes']>;
  operator_not?: InputMaybe<Scalars['Bytes']>;
  operator_gt?: InputMaybe<Scalars['Bytes']>;
  operator_lt?: InputMaybe<Scalars['Bytes']>;
  operator_gte?: InputMaybe<Scalars['Bytes']>;
  operator_lte?: InputMaybe<Scalars['Bytes']>;
  operator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  operator_contains?: InputMaybe<Scalars['Bytes']>;
  operator_not_contains?: InputMaybe<Scalars['Bytes']>;
  approved?: InputMaybe<Scalars['Boolean']>;
  approved_not?: InputMaybe<Scalars['Boolean']>;
  approved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ApprovalForAll_orderBy =
  | 'id'
  | 'owner'
  | 'operator'
  | 'approved'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Approval_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_gt?: InputMaybe<Scalars['Bytes']>;
  owner_lt?: InputMaybe<Scalars['Bytes']>;
  owner_gte?: InputMaybe<Scalars['Bytes']>;
  owner_lte?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  approved?: InputMaybe<Scalars['Bytes']>;
  approved_not?: InputMaybe<Scalars['Bytes']>;
  approved_gt?: InputMaybe<Scalars['Bytes']>;
  approved_lt?: InputMaybe<Scalars['Bytes']>;
  approved_gte?: InputMaybe<Scalars['Bytes']>;
  approved_lte?: InputMaybe<Scalars['Bytes']>;
  approved_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  approved_contains?: InputMaybe<Scalars['Bytes']>;
  approved_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Approval_orderBy =
  | 'id'
  | 'owner'
  | 'approved'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CollectionRoleGranted = {
  id: Scalars['Bytes'];
  role: Scalars['Int'];
  toAddress: Scalars['Bytes'];
  byAddress: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CollectionRoleGranted_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  role?: InputMaybe<Scalars['Int']>;
  role_not?: InputMaybe<Scalars['Int']>;
  role_gt?: InputMaybe<Scalars['Int']>;
  role_lt?: InputMaybe<Scalars['Int']>;
  role_gte?: InputMaybe<Scalars['Int']>;
  role_lte?: InputMaybe<Scalars['Int']>;
  role_in?: InputMaybe<Array<Scalars['Int']>>;
  role_not_in?: InputMaybe<Array<Scalars['Int']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress?: InputMaybe<Scalars['Bytes']>;
  byAddress_not?: InputMaybe<Scalars['Bytes']>;
  byAddress_gt?: InputMaybe<Scalars['Bytes']>;
  byAddress_lt?: InputMaybe<Scalars['Bytes']>;
  byAddress_gte?: InputMaybe<Scalars['Bytes']>;
  byAddress_lte?: InputMaybe<Scalars['Bytes']>;
  byAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type CollectionRoleGranted_orderBy =
  | 'id'
  | 'role'
  | 'toAddress'
  | 'byAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type CollectionRoleRevoked = {
  id: Scalars['Bytes'];
  role: Scalars['Int'];
  toAddress: Scalars['Bytes'];
  byAddress: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type CollectionRoleRevoked_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  role?: InputMaybe<Scalars['Int']>;
  role_not?: InputMaybe<Scalars['Int']>;
  role_gt?: InputMaybe<Scalars['Int']>;
  role_lt?: InputMaybe<Scalars['Int']>;
  role_gte?: InputMaybe<Scalars['Int']>;
  role_lte?: InputMaybe<Scalars['Int']>;
  role_in?: InputMaybe<Array<Scalars['Int']>>;
  role_not_in?: InputMaybe<Array<Scalars['Int']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress?: InputMaybe<Scalars['Bytes']>;
  byAddress_not?: InputMaybe<Scalars['Bytes']>;
  byAddress_gt?: InputMaybe<Scalars['Bytes']>;
  byAddress_lt?: InputMaybe<Scalars['Bytes']>;
  byAddress_gte?: InputMaybe<Scalars['Bytes']>;
  byAddress_lte?: InputMaybe<Scalars['Bytes']>;
  byAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type CollectionRoleRevoked_orderBy =
  | 'id'
  | 'role'
  | 'toAddress'
  | 'byAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewBuild = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  commitHash: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewBuild_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  commitHash?: InputMaybe<Scalars['String']>;
  commitHash_not?: InputMaybe<Scalars['String']>;
  commitHash_gt?: InputMaybe<Scalars['String']>;
  commitHash_lt?: InputMaybe<Scalars['String']>;
  commitHash_gte?: InputMaybe<Scalars['String']>;
  commitHash_lte?: InputMaybe<Scalars['String']>;
  commitHash_in?: InputMaybe<Array<Scalars['String']>>;
  commitHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  commitHash_contains?: InputMaybe<Scalars['String']>;
  commitHash_contains_nocase?: InputMaybe<Scalars['String']>;
  commitHash_not_contains?: InputMaybe<Scalars['String']>;
  commitHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  commitHash_starts_with?: InputMaybe<Scalars['String']>;
  commitHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  commitHash_not_starts_with?: InputMaybe<Scalars['String']>;
  commitHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  commitHash_ends_with?: InputMaybe<Scalars['String']>;
  commitHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  commitHash_not_ends_with?: InputMaybe<Scalars['String']>;
  commitHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewBuild_orderBy =
  | 'id'
  | 'token'
  | 'commitHash'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewTokenDescription = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  description: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewTokenDescription_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewTokenDescription_orderBy =
  | 'id'
  | 'token'
  | 'description'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewTokenENS = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  ENS: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewTokenENS_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  ENS?: InputMaybe<Scalars['String']>;
  ENS_not?: InputMaybe<Scalars['String']>;
  ENS_gt?: InputMaybe<Scalars['String']>;
  ENS_lt?: InputMaybe<Scalars['String']>;
  ENS_gte?: InputMaybe<Scalars['String']>;
  ENS_lte?: InputMaybe<Scalars['String']>;
  ENS_in?: InputMaybe<Array<Scalars['String']>>;
  ENS_not_in?: InputMaybe<Array<Scalars['String']>>;
  ENS_contains?: InputMaybe<Scalars['String']>;
  ENS_contains_nocase?: InputMaybe<Scalars['String']>;
  ENS_not_contains?: InputMaybe<Scalars['String']>;
  ENS_not_contains_nocase?: InputMaybe<Scalars['String']>;
  ENS_starts_with?: InputMaybe<Scalars['String']>;
  ENS_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ENS_not_starts_with?: InputMaybe<Scalars['String']>;
  ENS_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  ENS_ends_with?: InputMaybe<Scalars['String']>;
  ENS_ends_with_nocase?: InputMaybe<Scalars['String']>;
  ENS_not_ends_with?: InputMaybe<Scalars['String']>;
  ENS_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewTokenENS_orderBy =
  | 'id'
  | 'token'
  | 'ENS'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewTokenExternalURL = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  externalURL: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewTokenExternalURL_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  externalURL?: InputMaybe<Scalars['String']>;
  externalURL_not?: InputMaybe<Scalars['String']>;
  externalURL_gt?: InputMaybe<Scalars['String']>;
  externalURL_lt?: InputMaybe<Scalars['String']>;
  externalURL_gte?: InputMaybe<Scalars['String']>;
  externalURL_lte?: InputMaybe<Scalars['String']>;
  externalURL_in?: InputMaybe<Array<Scalars['String']>>;
  externalURL_not_in?: InputMaybe<Array<Scalars['String']>>;
  externalURL_contains?: InputMaybe<Scalars['String']>;
  externalURL_contains_nocase?: InputMaybe<Scalars['String']>;
  externalURL_not_contains?: InputMaybe<Scalars['String']>;
  externalURL_not_contains_nocase?: InputMaybe<Scalars['String']>;
  externalURL_starts_with?: InputMaybe<Scalars['String']>;
  externalURL_starts_with_nocase?: InputMaybe<Scalars['String']>;
  externalURL_not_starts_with?: InputMaybe<Scalars['String']>;
  externalURL_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  externalURL_ends_with?: InputMaybe<Scalars['String']>;
  externalURL_ends_with_nocase?: InputMaybe<Scalars['String']>;
  externalURL_not_ends_with?: InputMaybe<Scalars['String']>;
  externalURL_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewTokenExternalURL_orderBy =
  | 'id'
  | 'token'
  | 'externalURL'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewTokenImage = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  image: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewTokenImage_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  image?: InputMaybe<Scalars['String']>;
  image_not?: InputMaybe<Scalars['String']>;
  image_gt?: InputMaybe<Scalars['String']>;
  image_lt?: InputMaybe<Scalars['String']>;
  image_gte?: InputMaybe<Scalars['String']>;
  image_lte?: InputMaybe<Scalars['String']>;
  image_in?: InputMaybe<Array<Scalars['String']>>;
  image_not_in?: InputMaybe<Array<Scalars['String']>>;
  image_contains?: InputMaybe<Scalars['String']>;
  image_contains_nocase?: InputMaybe<Scalars['String']>;
  image_not_contains?: InputMaybe<Scalars['String']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']>;
  image_starts_with?: InputMaybe<Scalars['String']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_starts_with?: InputMaybe<Scalars['String']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  image_ends_with?: InputMaybe<Scalars['String']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']>;
  image_not_ends_with?: InputMaybe<Scalars['String']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewTokenImage_orderBy =
  | 'id'
  | 'token'
  | 'image'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type NewTokenName = {
  id: Scalars['Bytes'];
  token: Scalars['BigInt'];
  name: Scalars['String'];
  triggeredBy: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type NewTokenName_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  token?: InputMaybe<Scalars['BigInt']>;
  token_not?: InputMaybe<Scalars['BigInt']>;
  token_gt?: InputMaybe<Scalars['BigInt']>;
  token_lt?: InputMaybe<Scalars['BigInt']>;
  token_gte?: InputMaybe<Scalars['BigInt']>;
  token_lte?: InputMaybe<Scalars['BigInt']>;
  token_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  triggeredBy?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lt?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_gte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_lte?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  triggeredBy_contains?: InputMaybe<Scalars['Bytes']>;
  triggeredBy_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewTokenName_orderBy =
  | 'id'
  | 'token'
  | 'name'
  | 'triggeredBy'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection = 'asc' | 'desc';

export type Query = {
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  collectionRoleGranted?: Maybe<CollectionRoleGranted>;
  collectionRoleGranteds: Array<CollectionRoleGranted>;
  collectionRoleRevoked?: Maybe<CollectionRoleRevoked>;
  collectionRoleRevokeds: Array<CollectionRoleRevoked>;
  newBuild?: Maybe<NewBuild>;
  newBuilds: Array<NewBuild>;
  newTokenDescription?: Maybe<NewTokenDescription>;
  newTokenDescriptions: Array<NewTokenDescription>;
  newTokenENS?: Maybe<NewTokenENS>;
  newTokenENSs: Array<NewTokenENS>;
  newTokenExternalURL?: Maybe<NewTokenExternalURL>;
  newTokenExternalURLs: Array<NewTokenExternalURL>;
  newTokenImage?: Maybe<NewTokenImage>;
  newTokenImages: Array<NewTokenImage>;
  newTokenName?: Maybe<NewTokenName>;
  newTokenNames: Array<NewTokenName>;
  tokenRoleGranted?: Maybe<TokenRoleGranted>;
  tokenRoleGranteds: Array<TokenRoleGranted>;
  tokenRoleRevoked?: Maybe<TokenRoleRevoked>;
  tokenRoleRevokeds: Array<TokenRoleRevoked>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};

export type QueryapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerycollectionRoleGrantedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerycollectionRoleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionRoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionRoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerycollectionRoleRevokedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerycollectionRoleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionRoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionRoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewBuildArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewBuildsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBuild_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBuild_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenDescriptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenDescriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenDescription_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenDescription_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenENSArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenENSsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenENS_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenENS_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenExternalURLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenExternalURLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenExternalURL_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenExternalURL_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenImageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenImagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenImage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenImage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenNameArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerynewTokenNamesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenName_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenName_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenRoleGrantedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenRoleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenRoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenRoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenRoleRevokedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytokenRoleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenRoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenRoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerytransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  approval?: Maybe<Approval>;
  approvals: Array<Approval>;
  approvalForAll?: Maybe<ApprovalForAll>;
  approvalForAlls: Array<ApprovalForAll>;
  collectionRoleGranted?: Maybe<CollectionRoleGranted>;
  collectionRoleGranteds: Array<CollectionRoleGranted>;
  collectionRoleRevoked?: Maybe<CollectionRoleRevoked>;
  collectionRoleRevokeds: Array<CollectionRoleRevoked>;
  newBuild?: Maybe<NewBuild>;
  newBuilds: Array<NewBuild>;
  newTokenDescription?: Maybe<NewTokenDescription>;
  newTokenDescriptions: Array<NewTokenDescription>;
  newTokenENS?: Maybe<NewTokenENS>;
  newTokenENSs: Array<NewTokenENS>;
  newTokenExternalURL?: Maybe<NewTokenExternalURL>;
  newTokenExternalURLs: Array<NewTokenExternalURL>;
  newTokenImage?: Maybe<NewTokenImage>;
  newTokenImages: Array<NewTokenImage>;
  newTokenName?: Maybe<NewTokenName>;
  newTokenNames: Array<NewTokenName>;
  tokenRoleGranted?: Maybe<TokenRoleGranted>;
  tokenRoleGranteds: Array<TokenRoleGranted>;
  tokenRoleRevoked?: Maybe<TokenRoleRevoked>;
  tokenRoleRevokeds: Array<TokenRoleRevoked>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};

export type SubscriptionapprovalArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionapprovalsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Approval_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Approval_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionapprovalForAllArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionapprovalForAllsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ApprovalForAll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ApprovalForAll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptioncollectionRoleGrantedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptioncollectionRoleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionRoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionRoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptioncollectionRoleRevokedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptioncollectionRoleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectionRoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectionRoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewBuildArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewBuildsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewBuild_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewBuild_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenDescriptionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenDescriptionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenDescription_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenDescription_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenENSArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenENSsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenENS_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenENS_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenExternalURLArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenExternalURLsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenExternalURL_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenExternalURL_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenImageArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenImagesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenImage_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenImage_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenNameArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionnewTokenNamesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewTokenName_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewTokenName_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenRoleGrantedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenRoleGrantedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenRoleGranted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenRoleGranted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenRoleRevokedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontokenRoleRevokedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenRoleRevoked_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenRoleRevoked_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransferArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptiontransfersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transfer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};

export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type TokenRoleGranted = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  role: Scalars['Int'];
  toAddress: Scalars['Bytes'];
  byAddress: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokenRoleGranted_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  role?: InputMaybe<Scalars['Int']>;
  role_not?: InputMaybe<Scalars['Int']>;
  role_gt?: InputMaybe<Scalars['Int']>;
  role_lt?: InputMaybe<Scalars['Int']>;
  role_gte?: InputMaybe<Scalars['Int']>;
  role_lte?: InputMaybe<Scalars['Int']>;
  role_in?: InputMaybe<Array<Scalars['Int']>>;
  role_not_in?: InputMaybe<Array<Scalars['Int']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress?: InputMaybe<Scalars['Bytes']>;
  byAddress_not?: InputMaybe<Scalars['Bytes']>;
  byAddress_gt?: InputMaybe<Scalars['Bytes']>;
  byAddress_lt?: InputMaybe<Scalars['Bytes']>;
  byAddress_gte?: InputMaybe<Scalars['Bytes']>;
  byAddress_lte?: InputMaybe<Scalars['Bytes']>;
  byAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenRoleGranted_orderBy =
  | 'id'
  | 'tokenId'
  | 'role'
  | 'toAddress'
  | 'byAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type TokenRoleRevoked = {
  id: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  role: Scalars['Int'];
  toAddress: Scalars['Bytes'];
  byAddress: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type TokenRoleRevoked_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  role?: InputMaybe<Scalars['Int']>;
  role_not?: InputMaybe<Scalars['Int']>;
  role_gt?: InputMaybe<Scalars['Int']>;
  role_lt?: InputMaybe<Scalars['Int']>;
  role_gte?: InputMaybe<Scalars['Int']>;
  role_lte?: InputMaybe<Scalars['Int']>;
  role_in?: InputMaybe<Array<Scalars['Int']>>;
  role_not_in?: InputMaybe<Array<Scalars['Int']>>;
  toAddress?: InputMaybe<Scalars['Bytes']>;
  toAddress_not?: InputMaybe<Scalars['Bytes']>;
  toAddress_gt?: InputMaybe<Scalars['Bytes']>;
  toAddress_lt?: InputMaybe<Scalars['Bytes']>;
  toAddress_gte?: InputMaybe<Scalars['Bytes']>;
  toAddress_lte?: InputMaybe<Scalars['Bytes']>;
  toAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  toAddress_contains?: InputMaybe<Scalars['Bytes']>;
  toAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress?: InputMaybe<Scalars['Bytes']>;
  byAddress_not?: InputMaybe<Scalars['Bytes']>;
  byAddress_gt?: InputMaybe<Scalars['Bytes']>;
  byAddress_lt?: InputMaybe<Scalars['Bytes']>;
  byAddress_gte?: InputMaybe<Scalars['Bytes']>;
  byAddress_lte?: InputMaybe<Scalars['Bytes']>;
  byAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  byAddress_contains?: InputMaybe<Scalars['Bytes']>;
  byAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenRoleRevoked_orderBy =
  | 'id'
  | 'tokenId'
  | 'role'
  | 'toAddress'
  | 'byAddress'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Transfer = {
  id: Scalars['Bytes'];
  from: Scalars['Bytes'];
  to: Scalars['Bytes'];
  tokenId: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Transfer_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_gt?: InputMaybe<Scalars['Bytes']>;
  from_lt?: InputMaybe<Scalars['Bytes']>;
  from_gte?: InputMaybe<Scalars['Bytes']>;
  from_lte?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_gt?: InputMaybe<Scalars['Bytes']>;
  to_lt?: InputMaybe<Scalars['Bytes']>;
  to_gte?: InputMaybe<Scalars['Bytes']>;
  to_lte?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  tokenId?: InputMaybe<Scalars['BigInt']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Transfer_orderBy =
  | 'id'
  | 'from'
  | 'to'
  | 'tokenId'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Approval: ResolverTypeWrapper<Approval>;
  ApprovalForAll: ResolverTypeWrapper<ApprovalForAll>;
  ApprovalForAll_filter: ApprovalForAll_filter;
  ApprovalForAll_orderBy: ApprovalForAll_orderBy;
  Approval_filter: Approval_filter;
  Approval_orderBy: Approval_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  CollectionRoleGranted: ResolverTypeWrapper<CollectionRoleGranted>;
  CollectionRoleGranted_filter: CollectionRoleGranted_filter;
  CollectionRoleGranted_orderBy: CollectionRoleGranted_orderBy;
  CollectionRoleRevoked: ResolverTypeWrapper<CollectionRoleRevoked>;
  CollectionRoleRevoked_filter: CollectionRoleRevoked_filter;
  CollectionRoleRevoked_orderBy: CollectionRoleRevoked_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  NewBuild: ResolverTypeWrapper<NewBuild>;
  NewBuild_filter: NewBuild_filter;
  NewBuild_orderBy: NewBuild_orderBy;
  NewTokenDescription: ResolverTypeWrapper<NewTokenDescription>;
  NewTokenDescription_filter: NewTokenDescription_filter;
  NewTokenDescription_orderBy: NewTokenDescription_orderBy;
  NewTokenENS: ResolverTypeWrapper<NewTokenENS>;
  NewTokenENS_filter: NewTokenENS_filter;
  NewTokenENS_orderBy: NewTokenENS_orderBy;
  NewTokenExternalURL: ResolverTypeWrapper<NewTokenExternalURL>;
  NewTokenExternalURL_filter: NewTokenExternalURL_filter;
  NewTokenExternalURL_orderBy: NewTokenExternalURL_orderBy;
  NewTokenImage: ResolverTypeWrapper<NewTokenImage>;
  NewTokenImage_filter: NewTokenImage_filter;
  NewTokenImage_orderBy: NewTokenImage_orderBy;
  NewTokenName: ResolverTypeWrapper<NewTokenName>;
  NewTokenName_filter: NewTokenName_filter;
  NewTokenName_orderBy: NewTokenName_orderBy;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  TokenRoleGranted: ResolverTypeWrapper<TokenRoleGranted>;
  TokenRoleGranted_filter: TokenRoleGranted_filter;
  TokenRoleGranted_orderBy: TokenRoleGranted_orderBy;
  TokenRoleRevoked: ResolverTypeWrapper<TokenRoleRevoked>;
  TokenRoleRevoked_filter: TokenRoleRevoked_filter;
  TokenRoleRevoked_orderBy: TokenRoleRevoked_orderBy;
  Transfer: ResolverTypeWrapper<Transfer>;
  Transfer_filter: Transfer_filter;
  Transfer_orderBy: Transfer_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Approval: Approval;
  ApprovalForAll: ApprovalForAll;
  ApprovalForAll_filter: ApprovalForAll_filter;
  Approval_filter: Approval_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  CollectionRoleGranted: CollectionRoleGranted;
  CollectionRoleGranted_filter: CollectionRoleGranted_filter;
  CollectionRoleRevoked: CollectionRoleRevoked;
  CollectionRoleRevoked_filter: CollectionRoleRevoked_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  NewBuild: NewBuild;
  NewBuild_filter: NewBuild_filter;
  NewTokenDescription: NewTokenDescription;
  NewTokenDescription_filter: NewTokenDescription_filter;
  NewTokenENS: NewTokenENS;
  NewTokenENS_filter: NewTokenENS_filter;
  NewTokenExternalURL: NewTokenExternalURL;
  NewTokenExternalURL_filter: NewTokenExternalURL_filter;
  NewTokenImage: NewTokenImage;
  NewTokenImage_filter: NewTokenImage_filter;
  NewTokenName: NewTokenName;
  NewTokenName_filter: NewTokenName_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  TokenRoleGranted: TokenRoleGranted;
  TokenRoleGranted_filter: TokenRoleGranted_filter;
  TokenRoleRevoked: TokenRoleRevoked;
  TokenRoleRevoked_filter: TokenRoleRevoked_filter;
  Transfer: Transfer;
  Transfer_filter: Transfer_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = {};

export type entityDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = entityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = subgraphIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = MeshContext,
  Args = derivedFromDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ApprovalResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Approval'] = ResolversParentTypes['Approval']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApprovalForAllResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['ApprovalForAll'] = ResolversParentTypes['ApprovalForAll']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  approved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type CollectionRoleGrantedResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['CollectionRoleGranted'] = ResolversParentTypes['CollectionRoleGranted']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  byAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CollectionRoleRevokedResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['CollectionRoleRevoked'] = ResolversParentTypes['CollectionRoleRevoked']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  byAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewBuildResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewBuild'] = ResolversParentTypes['NewBuild']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  commitHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewTokenDescriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewTokenDescription'] = ResolversParentTypes['NewTokenDescription']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewTokenENSResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewTokenENS'] = ResolversParentTypes['NewTokenENS']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  ENS?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewTokenExternalURLResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewTokenExternalURL'] = ResolversParentTypes['NewTokenExternalURL']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  externalURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewTokenImageResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewTokenImage'] = ResolversParentTypes['NewTokenImage']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewTokenNameResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['NewTokenName'] = ResolversParentTypes['NewTokenName']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggeredBy?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  approval?: Resolver<
    Maybe<ResolversTypes['Approval']>,
    ParentType,
    ContextType,
    RequireFields<QueryapprovalArgs, 'id' | 'subgraphError'>
  >;
  approvals?: Resolver<
    Array<ResolversTypes['Approval']>,
    ParentType,
    ContextType,
    RequireFields<QueryapprovalsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  approvalForAll?: Resolver<
    Maybe<ResolversTypes['ApprovalForAll']>,
    ParentType,
    ContextType,
    RequireFields<QueryapprovalForAllArgs, 'id' | 'subgraphError'>
  >;
  approvalForAlls?: Resolver<
    Array<ResolversTypes['ApprovalForAll']>,
    ParentType,
    ContextType,
    RequireFields<QueryapprovalForAllsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  collectionRoleGranted?: Resolver<
    Maybe<ResolversTypes['CollectionRoleGranted']>,
    ParentType,
    ContextType,
    RequireFields<QuerycollectionRoleGrantedArgs, 'id' | 'subgraphError'>
  >;
  collectionRoleGranteds?: Resolver<
    Array<ResolversTypes['CollectionRoleGranted']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerycollectionRoleGrantedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  collectionRoleRevoked?: Resolver<
    Maybe<ResolversTypes['CollectionRoleRevoked']>,
    ParentType,
    ContextType,
    RequireFields<QuerycollectionRoleRevokedArgs, 'id' | 'subgraphError'>
  >;
  collectionRoleRevokeds?: Resolver<
    Array<ResolversTypes['CollectionRoleRevoked']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerycollectionRoleRevokedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newBuild?: Resolver<
    Maybe<ResolversTypes['NewBuild']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewBuildArgs, 'id' | 'subgraphError'>
  >;
  newBuilds?: Resolver<
    Array<ResolversTypes['NewBuild']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewBuildsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  newTokenDescription?: Resolver<
    Maybe<ResolversTypes['NewTokenDescription']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenDescriptionArgs, 'id' | 'subgraphError'>
  >;
  newTokenDescriptions?: Resolver<
    Array<ResolversTypes['NewTokenDescription']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerynewTokenDescriptionsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenENS?: Resolver<
    Maybe<ResolversTypes['NewTokenENS']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenENSArgs, 'id' | 'subgraphError'>
  >;
  newTokenENSs?: Resolver<
    Array<ResolversTypes['NewTokenENS']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenENSsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  newTokenExternalURL?: Resolver<
    Maybe<ResolversTypes['NewTokenExternalURL']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenExternalURLArgs, 'id' | 'subgraphError'>
  >;
  newTokenExternalURLs?: Resolver<
    Array<ResolversTypes['NewTokenExternalURL']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerynewTokenExternalURLsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenImage?: Resolver<
    Maybe<ResolversTypes['NewTokenImage']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenImageArgs, 'id' | 'subgraphError'>
  >;
  newTokenImages?: Resolver<
    Array<ResolversTypes['NewTokenImage']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenImagesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  newTokenName?: Resolver<
    Maybe<ResolversTypes['NewTokenName']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenNameArgs, 'id' | 'subgraphError'>
  >;
  newTokenNames?: Resolver<
    Array<ResolversTypes['NewTokenName']>,
    ParentType,
    ContextType,
    RequireFields<QuerynewTokenNamesArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  tokenRoleGranted?: Resolver<
    Maybe<ResolversTypes['TokenRoleGranted']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenRoleGrantedArgs, 'id' | 'subgraphError'>
  >;
  tokenRoleGranteds?: Resolver<
    Array<ResolversTypes['TokenRoleGranted']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerytokenRoleGrantedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  tokenRoleRevoked?: Resolver<
    Maybe<ResolversTypes['TokenRoleRevoked']>,
    ParentType,
    ContextType,
    RequireFields<QuerytokenRoleRevokedArgs, 'id' | 'subgraphError'>
  >;
  tokenRoleRevokeds?: Resolver<
    Array<ResolversTypes['TokenRoleRevoked']>,
    ParentType,
    ContextType,
    RequireFields<
      QuerytokenRoleRevokedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  transfer?: Resolver<
    Maybe<ResolversTypes['Transfer']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransferArgs, 'id' | 'subgraphError'>
  >;
  transfers?: Resolver<
    Array<ResolversTypes['Transfer']>,
    ParentType,
    ContextType,
    RequireFields<QuerytransfersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  _meta?: Resolver<
    Maybe<ResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<Query_metaArgs>
  >;
}>;

export type SubscriptionResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = ResolversObject<{
  approval?: SubscriptionResolver<
    Maybe<ResolversTypes['Approval']>,
    'approval',
    ParentType,
    ContextType,
    RequireFields<SubscriptionapprovalArgs, 'id' | 'subgraphError'>
  >;
  approvals?: SubscriptionResolver<
    Array<ResolversTypes['Approval']>,
    'approvals',
    ParentType,
    ContextType,
    RequireFields<SubscriptionapprovalsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  approvalForAll?: SubscriptionResolver<
    Maybe<ResolversTypes['ApprovalForAll']>,
    'approvalForAll',
    ParentType,
    ContextType,
    RequireFields<SubscriptionapprovalForAllArgs, 'id' | 'subgraphError'>
  >;
  approvalForAlls?: SubscriptionResolver<
    Array<ResolversTypes['ApprovalForAll']>,
    'approvalForAlls',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionapprovalForAllsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  collectionRoleGranted?: SubscriptionResolver<
    Maybe<ResolversTypes['CollectionRoleGranted']>,
    'collectionRoleGranted',
    ParentType,
    ContextType,
    RequireFields<SubscriptioncollectionRoleGrantedArgs, 'id' | 'subgraphError'>
  >;
  collectionRoleGranteds?: SubscriptionResolver<
    Array<ResolversTypes['CollectionRoleGranted']>,
    'collectionRoleGranteds',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptioncollectionRoleGrantedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  collectionRoleRevoked?: SubscriptionResolver<
    Maybe<ResolversTypes['CollectionRoleRevoked']>,
    'collectionRoleRevoked',
    ParentType,
    ContextType,
    RequireFields<SubscriptioncollectionRoleRevokedArgs, 'id' | 'subgraphError'>
  >;
  collectionRoleRevokeds?: SubscriptionResolver<
    Array<ResolversTypes['CollectionRoleRevoked']>,
    'collectionRoleRevokeds',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptioncollectionRoleRevokedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newBuild?: SubscriptionResolver<
    Maybe<ResolversTypes['NewBuild']>,
    'newBuild',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewBuildArgs, 'id' | 'subgraphError'>
  >;
  newBuilds?: SubscriptionResolver<
    Array<ResolversTypes['NewBuild']>,
    'newBuilds',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewBuildsArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  newTokenDescription?: SubscriptionResolver<
    Maybe<ResolversTypes['NewTokenDescription']>,
    'newTokenDescription',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewTokenDescriptionArgs, 'id' | 'subgraphError'>
  >;
  newTokenDescriptions?: SubscriptionResolver<
    Array<ResolversTypes['NewTokenDescription']>,
    'newTokenDescriptions',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionnewTokenDescriptionsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenENS?: SubscriptionResolver<
    Maybe<ResolversTypes['NewTokenENS']>,
    'newTokenENS',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewTokenENSArgs, 'id' | 'subgraphError'>
  >;
  newTokenENSs?: SubscriptionResolver<
    Array<ResolversTypes['NewTokenENS']>,
    'newTokenENSs',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionnewTokenENSsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenExternalURL?: SubscriptionResolver<
    Maybe<ResolversTypes['NewTokenExternalURL']>,
    'newTokenExternalURL',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewTokenExternalURLArgs, 'id' | 'subgraphError'>
  >;
  newTokenExternalURLs?: SubscriptionResolver<
    Array<ResolversTypes['NewTokenExternalURL']>,
    'newTokenExternalURLs',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionnewTokenExternalURLsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenImage?: SubscriptionResolver<
    Maybe<ResolversTypes['NewTokenImage']>,
    'newTokenImage',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewTokenImageArgs, 'id' | 'subgraphError'>
  >;
  newTokenImages?: SubscriptionResolver<
    Array<ResolversTypes['NewTokenImage']>,
    'newTokenImages',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionnewTokenImagesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  newTokenName?: SubscriptionResolver<
    Maybe<ResolversTypes['NewTokenName']>,
    'newTokenName',
    ParentType,
    ContextType,
    RequireFields<SubscriptionnewTokenNameArgs, 'id' | 'subgraphError'>
  >;
  newTokenNames?: SubscriptionResolver<
    Array<ResolversTypes['NewTokenName']>,
    'newTokenNames',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptionnewTokenNamesArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  tokenRoleGranted?: SubscriptionResolver<
    Maybe<ResolversTypes['TokenRoleGranted']>,
    'tokenRoleGranted',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokenRoleGrantedArgs, 'id' | 'subgraphError'>
  >;
  tokenRoleGranteds?: SubscriptionResolver<
    Array<ResolversTypes['TokenRoleGranted']>,
    'tokenRoleGranteds',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptiontokenRoleGrantedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  tokenRoleRevoked?: SubscriptionResolver<
    Maybe<ResolversTypes['TokenRoleRevoked']>,
    'tokenRoleRevoked',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontokenRoleRevokedArgs, 'id' | 'subgraphError'>
  >;
  tokenRoleRevokeds?: SubscriptionResolver<
    Array<ResolversTypes['TokenRoleRevoked']>,
    'tokenRoleRevokeds',
    ParentType,
    ContextType,
    RequireFields<
      SubscriptiontokenRoleRevokedsArgs,
      'skip' | 'first' | 'subgraphError'
    >
  >;
  transfer?: SubscriptionResolver<
    Maybe<ResolversTypes['Transfer']>,
    'transfer',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontransferArgs, 'id' | 'subgraphError'>
  >;
  transfers?: SubscriptionResolver<
    Array<ResolversTypes['Transfer']>,
    'transfers',
    ParentType,
    ContextType,
    RequireFields<SubscriptiontransfersArgs, 'skip' | 'first' | 'subgraphError'>
  >;
  _meta?: SubscriptionResolver<
    Maybe<ResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<Subscription_metaArgs>
  >;
}>;

export type TokenRoleGrantedResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['TokenRoleGranted'] = ResolversParentTypes['TokenRoleGranted']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  byAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenRoleRevokedResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['TokenRoleRevoked'] = ResolversParentTypes['TokenRoleRevoked']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  byAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransferResolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']
> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<
  ContextType = MeshContext,
  ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']
> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Approval?: ApprovalResolvers<ContextType>;
  ApprovalForAll?: ApprovalForAllResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  CollectionRoleGranted?: CollectionRoleGrantedResolvers<ContextType>;
  CollectionRoleRevoked?: CollectionRoleRevokedResolvers<ContextType>;
  NewBuild?: NewBuildResolvers<ContextType>;
  NewTokenDescription?: NewTokenDescriptionResolvers<ContextType>;
  NewTokenENS?: NewTokenENSResolvers<ContextType>;
  NewTokenExternalURL?: NewTokenExternalURLResolvers<ContextType>;
  NewTokenImage?: NewTokenImageResolvers<ContextType>;
  NewTokenName?: NewTokenNameResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TokenRoleGranted?: TokenRoleGrantedResolvers<ContextType>;
  TokenRoleRevoked?: TokenRoleRevokedResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = FleekNfaTypes.Context & BaseMeshContext;

const baseDir = pathModule.join(
  typeof __dirname === 'string' ? __dirname : '/',
  '..'
);

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (
    pathModule.isAbsolute(moduleId)
      ? pathModule.relative(baseDir, moduleId)
      : moduleId
  )
    .split('\\')
    .join('/')
    .replace(baseDir + '/', '');
  switch (relativeModuleId) {
    case '.graphclient/sources/FleekNFA/introspectionSchema':
      return import('./sources/FleekNFA/introspectionSchema') as T;

    default:
      return Promise.reject(
        new Error(`Cannot find module '${relativeModuleId}'.`)
      );
  }
};

const rootStore = new MeshStore(
  '.graphclient',
  new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
    fileType: 'ts',
  }),
  {
    readonly: true,
    validate: false,
  }
);

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any;
export async function getMeshOptions(): Promise<GetMeshOptions> {
  const pubsub = new PubSub();
  const sourcesStore = rootStore.child('sources');
  const logger = new DefaultLogger('GraphClient');
  const cache = new (MeshCache as any)({
    ...({} as any),
    importFn,
    store: rootStore.child('cache'),
    pubsub,
    logger,
  } as any);

  const sources: MeshResolvedSource[] = [];
  const transforms: MeshTransform[] = [];
  const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
  const fleekNfaTransforms = [];
  const additionalTypeDefs = [] as any[];
  const fleekNfaHandler = new GraphqlHandler({
    name: 'FleekNFA',
    config: {
      endpoint:
        'https://api.thegraph.com/subgraphs/name/emperororokusaki/flk-test-subgraph',
    },
    baseDir,
    cache,
    pubsub,
    store: sourcesStore.child('FleekNFA'),
    logger: logger.child('FleekNFA'),
    importFn,
  });
  sources[0] = {
    name: 'FleekNFA',
    handler: fleekNfaHandler,
    transforms: fleekNfaTransforms,
  };
  const additionalResolvers = [] as any[];
  const merger = new (BareMerger as any)({
    cache,
    pubsub,
    logger: logger.child('bareMerger'),
    store: rootStore.child('bareMerger'),
  });

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
        {
          document: FirstFiveMintsByUserDocument,
          get rawSDL() {
            return printWithCache(FirstFiveMintsByUserDocument);
          },
          location: 'FirstFiveMintsByUserDocument.graphql',
        },
        {
          document: LastFiveMintsDocument,
          get rawSDL() {
            return printWithCache(LastFiveMintsDocument);
          },
          location: 'LastFiveMintsDocument.graphql',
        },
        {
          document: AllNameChangesOfTokenZeroDocument,
          get rawSDL() {
            return printWithCache(AllNameChangesOfTokenZeroDocument);
          },
          location: 'AllNameChangesOfTokenZeroDocument.graphql',
        },
        {
          document: AllNameChangesOfTokenZeroTriggeredByUserDocument,
          get rawSDL() {
            return printWithCache(
              AllNameChangesOfTokenZeroTriggeredByUserDocument
            );
          },
          location: 'AllNameChangesOfTokenZeroTriggeredByUserDocument.graphql',
        },
        {
          document:
            TheSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument,
          get rawSDL() {
            return printWithCache(
              TheSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument
            );
          },
          location:
            'TheSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument.graphql',
        },
        {
          document: TheThreeNewestBuildsThatWereNotTriggeredByUserDocument,
          get rawSDL() {
            return printWithCache(
              TheThreeNewestBuildsThatWereNotTriggeredByUserDocument
            );
          },
          location:
            'TheThreeNewestBuildsThatWereNotTriggeredByUserDocument.graphql',
        },
      ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  });
}

let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions()
      .then((meshOptions) => getMesh(meshOptions))
      .then((mesh) => {
        const id = mesh.pubsub.subscribe('destroy', () => {
          meshInstance$ = undefined;
          mesh.pubsub.unsubscribe(id);
        });
        return mesh;
      });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) =>
  getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) =>
  getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(
  globalContext?: TGlobalContext
) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) =>
    sdkRequesterFactory(globalContext)
  );
  return getSdk<TOperationContext, TGlobalContext>((...args) =>
    sdkRequester$.then((sdkRequester) => sdkRequester(...args))
  );
}
export type firstFiveMintsByUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type firstFiveMintsByUserQuery = {
  transfers: Array<Pick<Transfer, 'id' | 'tokenId'>>;
};

export type lastFiveMintsQueryVariables = Exact<{ [key: string]: never }>;

export type lastFiveMintsQuery = {
  transfers: Array<Pick<Transfer, 'id' | 'tokenId' | 'to'>>;
};

export type allNameChangesOfTokenZeroQueryVariables = Exact<{
  [key: string]: never;
}>;

export type allNameChangesOfTokenZeroQuery = {
  newTokenNames: Array<Pick<NewTokenName, 'id' | 'name' | 'triggeredBy'>>;
};

export type allNameChangesOfTokenZeroTriggeredByUserQueryVariables = Exact<{
  [key: string]: never;
}>;

export type allNameChangesOfTokenZeroTriggeredByUserQuery = {
  newTokenNames: Array<Pick<NewTokenName, 'id' | 'name' | 'triggeredBy'>>;
};

export type theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQueryVariables =
  Exact<{ [key: string]: never }>;

export type theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery = {
  collectionRoleGranteds: Array<
    Pick<CollectionRoleGranted, 'id' | 'role' | 'toAddress'>
  >;
};

export type theThreeNewestBuildsThatWereNotTriggeredByUserQueryVariables =
  Exact<{ [key: string]: never }>;

export type theThreeNewestBuildsThatWereNotTriggeredByUserQuery = {
  newBuilds: Array<
    Pick<NewBuild, 'id' | 'commitHash' | 'token' | 'triggeredBy'>
  >;
};

export const firstFiveMintsByUserDocument = gql`
  query firstFiveMintsByUser {
    transfers(
      where: {
        from: "0x0000000000000000000000000000000000000000"
        to: "0xd4997d0facc83231b9f26a8b2155b4869e99946f"
      }
      first: 5
    ) {
      id
      tokenId
    }
  }
` as unknown as DocumentNode<
  firstFiveMintsByUserQuery,
  firstFiveMintsByUserQueryVariables
>;
export const lastFiveMintsDocument = gql`
  query lastFiveMints {
    transfers(
      where: { from: "0x0000000000000000000000000000000000000000" }
      first: 5
      orderDirection: desc
    ) {
      id
      tokenId
      to
    }
  }
` as unknown as DocumentNode<lastFiveMintsQuery, lastFiveMintsQueryVariables>;
export const allNameChangesOfTokenZeroDocument = gql`
  query allNameChangesOfTokenZero {
    newTokenNames(where: { token: "0" }) {
      id
      name
      triggeredBy
    }
  }
` as unknown as DocumentNode<
  allNameChangesOfTokenZeroQuery,
  allNameChangesOfTokenZeroQueryVariables
>;
export const allNameChangesOfTokenZeroTriggeredByUserDocument = gql`
  query allNameChangesOfTokenZeroTriggeredByUser {
    newTokenNames(
      where: {
        token: "0"
        triggeredBy: "0xd4997d0facc83231b9f26a8b2155b4869e99946f"
      }
    ) {
      id
      name
      triggeredBy
    }
  }
` as unknown as DocumentNode<
  allNameChangesOfTokenZeroTriggeredByUserQuery,
  allNameChangesOfTokenZeroTriggeredByUserQueryVariables
>;
export const theSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument =
  gql`
    query theSecondAndThirdCollectionRoleGrantedsTriggeredByUser {
      collectionRoleGranteds(
        where: { byAddress: "0xd4997d0facc83231b9f26a8b2155b4869e99946f" }
        first: 2
        skip: 1
      ) {
        id
        role
        toAddress
      }
    }
  ` as unknown as DocumentNode<
    theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery,
    theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQueryVariables
  >;
export const theThreeNewestBuildsThatWereNotTriggeredByUserDocument = gql`
  query theThreeNewestBuildsThatWereNotTriggeredByUser {
    newBuilds(
      where: { triggeredBy_not: "0xd4997d0facc83231b9f26a8b2155b4869e99946f" }
      orderDirection: desc
      first: 3
    ) {
      id
      commitHash
      token
      triggeredBy
    }
  }
` as unknown as DocumentNode<
  theThreeNewestBuildsThatWereNotTriggeredByUserQuery,
  theThreeNewestBuildsThatWereNotTriggeredByUserQueryVariables
>;

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    firstFiveMintsByUser(
      variables?: firstFiveMintsByUserQueryVariables,
      options?: C
    ): Promise<firstFiveMintsByUserQuery> {
      return requester<
        firstFiveMintsByUserQuery,
        firstFiveMintsByUserQueryVariables
      >(
        firstFiveMintsByUserDocument,
        variables,
        options
      ) as Promise<firstFiveMintsByUserQuery>;
    },
    lastFiveMints(
      variables?: lastFiveMintsQueryVariables,
      options?: C
    ): Promise<lastFiveMintsQuery> {
      return requester<lastFiveMintsQuery, lastFiveMintsQueryVariables>(
        lastFiveMintsDocument,
        variables,
        options
      ) as Promise<lastFiveMintsQuery>;
    },
    allNameChangesOfTokenZero(
      variables?: allNameChangesOfTokenZeroQueryVariables,
      options?: C
    ): Promise<allNameChangesOfTokenZeroQuery> {
      return requester<
        allNameChangesOfTokenZeroQuery,
        allNameChangesOfTokenZeroQueryVariables
      >(
        allNameChangesOfTokenZeroDocument,
        variables,
        options
      ) as Promise<allNameChangesOfTokenZeroQuery>;
    },
    allNameChangesOfTokenZeroTriggeredByUser(
      variables?: allNameChangesOfTokenZeroTriggeredByUserQueryVariables,
      options?: C
    ): Promise<allNameChangesOfTokenZeroTriggeredByUserQuery> {
      return requester<
        allNameChangesOfTokenZeroTriggeredByUserQuery,
        allNameChangesOfTokenZeroTriggeredByUserQueryVariables
      >(
        allNameChangesOfTokenZeroTriggeredByUserDocument,
        variables,
        options
      ) as Promise<allNameChangesOfTokenZeroTriggeredByUserQuery>;
    },
    theSecondAndThirdCollectionRoleGrantedsTriggeredByUser(
      variables?: theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQueryVariables,
      options?: C
    ): Promise<theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery> {
      return requester<
        theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery,
        theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQueryVariables
      >(
        theSecondAndThirdCollectionRoleGrantedsTriggeredByUserDocument,
        variables,
        options
      ) as Promise<theSecondAndThirdCollectionRoleGrantedsTriggeredByUserQuery>;
    },
    theThreeNewestBuildsThatWereNotTriggeredByUser(
      variables?: theThreeNewestBuildsThatWereNotTriggeredByUserQueryVariables,
      options?: C
    ): Promise<theThreeNewestBuildsThatWereNotTriggeredByUserQuery> {
      return requester<
        theThreeNewestBuildsThatWereNotTriggeredByUserQuery,
        theThreeNewestBuildsThatWereNotTriggeredByUserQueryVariables
      >(
        theThreeNewestBuildsThatWereNotTriggeredByUserDocument,
        variables,
        options
      ) as Promise<theThreeNewestBuildsThatWereNotTriggeredByUserQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
