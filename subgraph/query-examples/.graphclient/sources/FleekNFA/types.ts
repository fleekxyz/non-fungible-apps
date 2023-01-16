// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace FleekNfaTypes {
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

  export type QuerySdk = {
    /** null **/
    approval: InContextSdkMethod<
      Query['approval'],
      QueryapprovalArgs,
      MeshContext
    >;
    /** null **/
    approvals: InContextSdkMethod<
      Query['approvals'],
      QueryapprovalsArgs,
      MeshContext
    >;
    /** null **/
    approvalForAll: InContextSdkMethod<
      Query['approvalForAll'],
      QueryapprovalForAllArgs,
      MeshContext
    >;
    /** null **/
    approvalForAlls: InContextSdkMethod<
      Query['approvalForAlls'],
      QueryapprovalForAllsArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleGranted: InContextSdkMethod<
      Query['collectionRoleGranted'],
      QuerycollectionRoleGrantedArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleGranteds: InContextSdkMethod<
      Query['collectionRoleGranteds'],
      QuerycollectionRoleGrantedsArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleRevoked: InContextSdkMethod<
      Query['collectionRoleRevoked'],
      QuerycollectionRoleRevokedArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleRevokeds: InContextSdkMethod<
      Query['collectionRoleRevokeds'],
      QuerycollectionRoleRevokedsArgs,
      MeshContext
    >;
    /** null **/
    newBuild: InContextSdkMethod<
      Query['newBuild'],
      QuerynewBuildArgs,
      MeshContext
    >;
    /** null **/
    newBuilds: InContextSdkMethod<
      Query['newBuilds'],
      QuerynewBuildsArgs,
      MeshContext
    >;
    /** null **/
    newTokenDescription: InContextSdkMethod<
      Query['newTokenDescription'],
      QuerynewTokenDescriptionArgs,
      MeshContext
    >;
    /** null **/
    newTokenDescriptions: InContextSdkMethod<
      Query['newTokenDescriptions'],
      QuerynewTokenDescriptionsArgs,
      MeshContext
    >;
    /** null **/
    newTokenENS: InContextSdkMethod<
      Query['newTokenENS'],
      QuerynewTokenENSArgs,
      MeshContext
    >;
    /** null **/
    newTokenENSs: InContextSdkMethod<
      Query['newTokenENSs'],
      QuerynewTokenENSsArgs,
      MeshContext
    >;
    /** null **/
    newTokenExternalURL: InContextSdkMethod<
      Query['newTokenExternalURL'],
      QuerynewTokenExternalURLArgs,
      MeshContext
    >;
    /** null **/
    newTokenExternalURLs: InContextSdkMethod<
      Query['newTokenExternalURLs'],
      QuerynewTokenExternalURLsArgs,
      MeshContext
    >;
    /** null **/
    newTokenImage: InContextSdkMethod<
      Query['newTokenImage'],
      QuerynewTokenImageArgs,
      MeshContext
    >;
    /** null **/
    newTokenImages: InContextSdkMethod<
      Query['newTokenImages'],
      QuerynewTokenImagesArgs,
      MeshContext
    >;
    /** null **/
    newTokenName: InContextSdkMethod<
      Query['newTokenName'],
      QuerynewTokenNameArgs,
      MeshContext
    >;
    /** null **/
    newTokenNames: InContextSdkMethod<
      Query['newTokenNames'],
      QuerynewTokenNamesArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleGranted: InContextSdkMethod<
      Query['tokenRoleGranted'],
      QuerytokenRoleGrantedArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleGranteds: InContextSdkMethod<
      Query['tokenRoleGranteds'],
      QuerytokenRoleGrantedsArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleRevoked: InContextSdkMethod<
      Query['tokenRoleRevoked'],
      QuerytokenRoleRevokedArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleRevokeds: InContextSdkMethod<
      Query['tokenRoleRevokeds'],
      QuerytokenRoleRevokedsArgs,
      MeshContext
    >;
    /** null **/
    transfer: InContextSdkMethod<
      Query['transfer'],
      QuerytransferArgs,
      MeshContext
    >;
    /** null **/
    transfers: InContextSdkMethod<
      Query['transfers'],
      QuerytransfersArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
  };

  export type MutationSdk = {};

  export type SubscriptionSdk = {
    /** null **/
    approval: InContextSdkMethod<
      Subscription['approval'],
      SubscriptionapprovalArgs,
      MeshContext
    >;
    /** null **/
    approvals: InContextSdkMethod<
      Subscription['approvals'],
      SubscriptionapprovalsArgs,
      MeshContext
    >;
    /** null **/
    approvalForAll: InContextSdkMethod<
      Subscription['approvalForAll'],
      SubscriptionapprovalForAllArgs,
      MeshContext
    >;
    /** null **/
    approvalForAlls: InContextSdkMethod<
      Subscription['approvalForAlls'],
      SubscriptionapprovalForAllsArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleGranted: InContextSdkMethod<
      Subscription['collectionRoleGranted'],
      SubscriptioncollectionRoleGrantedArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleGranteds: InContextSdkMethod<
      Subscription['collectionRoleGranteds'],
      SubscriptioncollectionRoleGrantedsArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleRevoked: InContextSdkMethod<
      Subscription['collectionRoleRevoked'],
      SubscriptioncollectionRoleRevokedArgs,
      MeshContext
    >;
    /** null **/
    collectionRoleRevokeds: InContextSdkMethod<
      Subscription['collectionRoleRevokeds'],
      SubscriptioncollectionRoleRevokedsArgs,
      MeshContext
    >;
    /** null **/
    newBuild: InContextSdkMethod<
      Subscription['newBuild'],
      SubscriptionnewBuildArgs,
      MeshContext
    >;
    /** null **/
    newBuilds: InContextSdkMethod<
      Subscription['newBuilds'],
      SubscriptionnewBuildsArgs,
      MeshContext
    >;
    /** null **/
    newTokenDescription: InContextSdkMethod<
      Subscription['newTokenDescription'],
      SubscriptionnewTokenDescriptionArgs,
      MeshContext
    >;
    /** null **/
    newTokenDescriptions: InContextSdkMethod<
      Subscription['newTokenDescriptions'],
      SubscriptionnewTokenDescriptionsArgs,
      MeshContext
    >;
    /** null **/
    newTokenENS: InContextSdkMethod<
      Subscription['newTokenENS'],
      SubscriptionnewTokenENSArgs,
      MeshContext
    >;
    /** null **/
    newTokenENSs: InContextSdkMethod<
      Subscription['newTokenENSs'],
      SubscriptionnewTokenENSsArgs,
      MeshContext
    >;
    /** null **/
    newTokenExternalURL: InContextSdkMethod<
      Subscription['newTokenExternalURL'],
      SubscriptionnewTokenExternalURLArgs,
      MeshContext
    >;
    /** null **/
    newTokenExternalURLs: InContextSdkMethod<
      Subscription['newTokenExternalURLs'],
      SubscriptionnewTokenExternalURLsArgs,
      MeshContext
    >;
    /** null **/
    newTokenImage: InContextSdkMethod<
      Subscription['newTokenImage'],
      SubscriptionnewTokenImageArgs,
      MeshContext
    >;
    /** null **/
    newTokenImages: InContextSdkMethod<
      Subscription['newTokenImages'],
      SubscriptionnewTokenImagesArgs,
      MeshContext
    >;
    /** null **/
    newTokenName: InContextSdkMethod<
      Subscription['newTokenName'],
      SubscriptionnewTokenNameArgs,
      MeshContext
    >;
    /** null **/
    newTokenNames: InContextSdkMethod<
      Subscription['newTokenNames'],
      SubscriptionnewTokenNamesArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleGranted: InContextSdkMethod<
      Subscription['tokenRoleGranted'],
      SubscriptiontokenRoleGrantedArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleGranteds: InContextSdkMethod<
      Subscription['tokenRoleGranteds'],
      SubscriptiontokenRoleGrantedsArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleRevoked: InContextSdkMethod<
      Subscription['tokenRoleRevoked'],
      SubscriptiontokenRoleRevokedArgs,
      MeshContext
    >;
    /** null **/
    tokenRoleRevokeds: InContextSdkMethod<
      Subscription['tokenRoleRevokeds'],
      SubscriptiontokenRoleRevokedsArgs,
      MeshContext
    >;
    /** null **/
    transfer: InContextSdkMethod<
      Subscription['transfer'],
      SubscriptiontransferArgs,
      MeshContext
    >;
    /** null **/
    transfers: InContextSdkMethod<
      Subscription['transfers'],
      SubscriptiontransfersArgs,
      MeshContext
    >;
    /** Access to subgraph metadata **/
    _meta: InContextSdkMethod<
      Subscription['_meta'],
      Subscription_metaArgs,
      MeshContext
    >;
  };

  export type Context = {
    ['FleekNFA']: {
      Query: QuerySdk;
      Mutation: MutationSdk;
      Subscription: SubscriptionSdk;
    };
  };
}
