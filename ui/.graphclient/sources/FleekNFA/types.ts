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

  export type AccessPoint = {
    id: Scalars['String'];
    token: Token;
    score: Scalars['BigInt'];
    contentVerified: Scalars['Boolean'];
    nameVerified: Scalars['Boolean'];
    owner: Owner;
    creationStatus: Scalars['String'];
  };

  export type AccessPoint_filter = {
    id?: InputMaybe<Scalars['String']>;
    id_not?: InputMaybe<Scalars['String']>;
    id_gt?: InputMaybe<Scalars['String']>;
    id_lt?: InputMaybe<Scalars['String']>;
    id_gte?: InputMaybe<Scalars['String']>;
    id_lte?: InputMaybe<Scalars['String']>;
    id_in?: InputMaybe<Array<Scalars['String']>>;
    id_not_in?: InputMaybe<Array<Scalars['String']>>;
    id_contains?: InputMaybe<Scalars['String']>;
    id_contains_nocase?: InputMaybe<Scalars['String']>;
    id_not_contains?: InputMaybe<Scalars['String']>;
    id_not_contains_nocase?: InputMaybe<Scalars['String']>;
    id_starts_with?: InputMaybe<Scalars['String']>;
    id_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id_not_starts_with?: InputMaybe<Scalars['String']>;
    id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id_ends_with?: InputMaybe<Scalars['String']>;
    id_ends_with_nocase?: InputMaybe<Scalars['String']>;
    id_not_ends_with?: InputMaybe<Scalars['String']>;
    id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token?: InputMaybe<Scalars['String']>;
    token_not?: InputMaybe<Scalars['String']>;
    token_gt?: InputMaybe<Scalars['String']>;
    token_lt?: InputMaybe<Scalars['String']>;
    token_gte?: InputMaybe<Scalars['String']>;
    token_lte?: InputMaybe<Scalars['String']>;
    token_in?: InputMaybe<Array<Scalars['String']>>;
    token_not_in?: InputMaybe<Array<Scalars['String']>>;
    token_contains?: InputMaybe<Scalars['String']>;
    token_contains_nocase?: InputMaybe<Scalars['String']>;
    token_not_contains?: InputMaybe<Scalars['String']>;
    token_not_contains_nocase?: InputMaybe<Scalars['String']>;
    token_starts_with?: InputMaybe<Scalars['String']>;
    token_starts_with_nocase?: InputMaybe<Scalars['String']>;
    token_not_starts_with?: InputMaybe<Scalars['String']>;
    token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    token_ends_with?: InputMaybe<Scalars['String']>;
    token_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token_not_ends_with?: InputMaybe<Scalars['String']>;
    token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    token_?: InputMaybe<Token_filter>;
    score?: InputMaybe<Scalars['BigInt']>;
    score_not?: InputMaybe<Scalars['BigInt']>;
    score_gt?: InputMaybe<Scalars['BigInt']>;
    score_lt?: InputMaybe<Scalars['BigInt']>;
    score_gte?: InputMaybe<Scalars['BigInt']>;
    score_lte?: InputMaybe<Scalars['BigInt']>;
    score_in?: InputMaybe<Array<Scalars['BigInt']>>;
    score_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    contentVerified?: InputMaybe<Scalars['Boolean']>;
    contentVerified_not?: InputMaybe<Scalars['Boolean']>;
    contentVerified_in?: InputMaybe<Array<Scalars['Boolean']>>;
    contentVerified_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    nameVerified?: InputMaybe<Scalars['Boolean']>;
    nameVerified_not?: InputMaybe<Scalars['Boolean']>;
    nameVerified_in?: InputMaybe<Array<Scalars['Boolean']>>;
    nameVerified_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    owner?: InputMaybe<Scalars['String']>;
    owner_not?: InputMaybe<Scalars['String']>;
    owner_gt?: InputMaybe<Scalars['String']>;
    owner_lt?: InputMaybe<Scalars['String']>;
    owner_gte?: InputMaybe<Scalars['String']>;
    owner_lte?: InputMaybe<Scalars['String']>;
    owner_in?: InputMaybe<Array<Scalars['String']>>;
    owner_not_in?: InputMaybe<Array<Scalars['String']>>;
    owner_contains?: InputMaybe<Scalars['String']>;
    owner_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_not_contains?: InputMaybe<Scalars['String']>;
    owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_starts_with?: InputMaybe<Scalars['String']>;
    owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_starts_with?: InputMaybe<Scalars['String']>;
    owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_ends_with?: InputMaybe<Scalars['String']>;
    owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_ends_with?: InputMaybe<Scalars['String']>;
    owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_?: InputMaybe<Owner_filter>;
    creationStatus?: InputMaybe<Scalars['String']>;
    creationStatus_not?: InputMaybe<Scalars['String']>;
    creationStatus_gt?: InputMaybe<Scalars['String']>;
    creationStatus_lt?: InputMaybe<Scalars['String']>;
    creationStatus_gte?: InputMaybe<Scalars['String']>;
    creationStatus_lte?: InputMaybe<Scalars['String']>;
    creationStatus_in?: InputMaybe<Array<Scalars['String']>>;
    creationStatus_not_in?: InputMaybe<Array<Scalars['String']>>;
    creationStatus_contains?: InputMaybe<Scalars['String']>;
    creationStatus_contains_nocase?: InputMaybe<Scalars['String']>;
    creationStatus_not_contains?: InputMaybe<Scalars['String']>;
    creationStatus_not_contains_nocase?: InputMaybe<Scalars['String']>;
    creationStatus_starts_with?: InputMaybe<Scalars['String']>;
    creationStatus_starts_with_nocase?: InputMaybe<Scalars['String']>;
    creationStatus_not_starts_with?: InputMaybe<Scalars['String']>;
    creationStatus_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    creationStatus_ends_with?: InputMaybe<Scalars['String']>;
    creationStatus_ends_with_nocase?: InputMaybe<Scalars['String']>;
    creationStatus_not_ends_with?: InputMaybe<Scalars['String']>;
    creationStatus_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<AccessPoint_filter>>>;
    or?: InputMaybe<Array<InputMaybe<AccessPoint_filter>>>;
  };

  export type AccessPoint_orderBy =
    | 'id'
    | 'token'
    | 'token__id'
    | 'token__tokenId'
    | 'token__name'
    | 'token__description'
    | 'token__externalURL'
    | 'token__ENS'
    | 'token__logo'
    | 'token__color'
    | 'token__accessPointAutoApproval'
    | 'token__mintedBy'
    | 'token__commitHash'
    | 'score'
    | 'contentVerified'
    | 'nameVerified'
    | 'owner'
    | 'owner__id'
    | 'owner__collection'
    | 'creationStatus';

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
    and?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
    or?: InputMaybe<Array<InputMaybe<ApprovalForAll_filter>>>;
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
    and?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Approval_filter>>>;
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

  export type Controller = {
    id: Scalars['Bytes'];
    tokens?: Maybe<Array<Token>>;
  };

  export type ControllertokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
  };

  export type Controller_filter = {
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
    tokens_?: InputMaybe<Token_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Controller_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Controller_filter>>>;
  };

  export type Controller_orderBy = 'id' | 'tokens';

  export type GitRepository = {
    id: Scalars['String'];
    tokens?: Maybe<Array<Token>>;
  };

  export type GitRepositorytokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
  };

  export type GitRepository_filter = {
    id?: InputMaybe<Scalars['String']>;
    id_not?: InputMaybe<Scalars['String']>;
    id_gt?: InputMaybe<Scalars['String']>;
    id_lt?: InputMaybe<Scalars['String']>;
    id_gte?: InputMaybe<Scalars['String']>;
    id_lte?: InputMaybe<Scalars['String']>;
    id_in?: InputMaybe<Array<Scalars['String']>>;
    id_not_in?: InputMaybe<Array<Scalars['String']>>;
    id_contains?: InputMaybe<Scalars['String']>;
    id_contains_nocase?: InputMaybe<Scalars['String']>;
    id_not_contains?: InputMaybe<Scalars['String']>;
    id_not_contains_nocase?: InputMaybe<Scalars['String']>;
    id_starts_with?: InputMaybe<Scalars['String']>;
    id_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id_not_starts_with?: InputMaybe<Scalars['String']>;
    id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id_ends_with?: InputMaybe<Scalars['String']>;
    id_ends_with_nocase?: InputMaybe<Scalars['String']>;
    id_not_ends_with?: InputMaybe<Scalars['String']>;
    id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokens_?: InputMaybe<Token_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<GitRepository_filter>>>;
    or?: InputMaybe<Array<InputMaybe<GitRepository_filter>>>;
  };

  export type GitRepository_orderBy = 'id' | 'tokens';

  export type MetadataUpdate = {
    id: Scalars['Bytes'];
    tokenId: Scalars['BigInt'];
    key: Scalars['String'];
    stringValue?: Maybe<Scalars['String']>;
    uint24Value?: Maybe<Scalars['Int']>;
    doubleStringValue: Array<Scalars['String']>;
    booleanValue?: Maybe<Scalars['Boolean']>;
    byAddress: Scalars['Bytes'];
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
  };

  export type MetadataUpdate_filter = {
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
    key?: InputMaybe<Scalars['String']>;
    key_not?: InputMaybe<Scalars['String']>;
    key_gt?: InputMaybe<Scalars['String']>;
    key_lt?: InputMaybe<Scalars['String']>;
    key_gte?: InputMaybe<Scalars['String']>;
    key_lte?: InputMaybe<Scalars['String']>;
    key_in?: InputMaybe<Array<Scalars['String']>>;
    key_not_in?: InputMaybe<Array<Scalars['String']>>;
    key_contains?: InputMaybe<Scalars['String']>;
    key_contains_nocase?: InputMaybe<Scalars['String']>;
    key_not_contains?: InputMaybe<Scalars['String']>;
    key_not_contains_nocase?: InputMaybe<Scalars['String']>;
    key_starts_with?: InputMaybe<Scalars['String']>;
    key_starts_with_nocase?: InputMaybe<Scalars['String']>;
    key_not_starts_with?: InputMaybe<Scalars['String']>;
    key_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    key_ends_with?: InputMaybe<Scalars['String']>;
    key_ends_with_nocase?: InputMaybe<Scalars['String']>;
    key_not_ends_with?: InputMaybe<Scalars['String']>;
    key_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    stringValue?: InputMaybe<Scalars['String']>;
    stringValue_not?: InputMaybe<Scalars['String']>;
    stringValue_gt?: InputMaybe<Scalars['String']>;
    stringValue_lt?: InputMaybe<Scalars['String']>;
    stringValue_gte?: InputMaybe<Scalars['String']>;
    stringValue_lte?: InputMaybe<Scalars['String']>;
    stringValue_in?: InputMaybe<Array<Scalars['String']>>;
    stringValue_not_in?: InputMaybe<Array<Scalars['String']>>;
    stringValue_contains?: InputMaybe<Scalars['String']>;
    stringValue_contains_nocase?: InputMaybe<Scalars['String']>;
    stringValue_not_contains?: InputMaybe<Scalars['String']>;
    stringValue_not_contains_nocase?: InputMaybe<Scalars['String']>;
    stringValue_starts_with?: InputMaybe<Scalars['String']>;
    stringValue_starts_with_nocase?: InputMaybe<Scalars['String']>;
    stringValue_not_starts_with?: InputMaybe<Scalars['String']>;
    stringValue_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    stringValue_ends_with?: InputMaybe<Scalars['String']>;
    stringValue_ends_with_nocase?: InputMaybe<Scalars['String']>;
    stringValue_not_ends_with?: InputMaybe<Scalars['String']>;
    stringValue_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    uint24Value?: InputMaybe<Scalars['Int']>;
    uint24Value_not?: InputMaybe<Scalars['Int']>;
    uint24Value_gt?: InputMaybe<Scalars['Int']>;
    uint24Value_lt?: InputMaybe<Scalars['Int']>;
    uint24Value_gte?: InputMaybe<Scalars['Int']>;
    uint24Value_lte?: InputMaybe<Scalars['Int']>;
    uint24Value_in?: InputMaybe<Array<Scalars['Int']>>;
    uint24Value_not_in?: InputMaybe<Array<Scalars['Int']>>;
    doubleStringValue?: InputMaybe<Array<Scalars['String']>>;
    doubleStringValue_not?: InputMaybe<Array<Scalars['String']>>;
    doubleStringValue_contains?: InputMaybe<Array<Scalars['String']>>;
    doubleStringValue_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    doubleStringValue_not_contains?: InputMaybe<Array<Scalars['String']>>;
    doubleStringValue_not_contains_nocase?: InputMaybe<
      Array<Scalars['String']>
    >;
    booleanValue?: InputMaybe<Scalars['Boolean']>;
    booleanValue_not?: InputMaybe<Scalars['Boolean']>;
    booleanValue_in?: InputMaybe<Array<Scalars['Boolean']>>;
    booleanValue_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
    and?: InputMaybe<Array<InputMaybe<MetadataUpdate_filter>>>;
    or?: InputMaybe<Array<InputMaybe<MetadataUpdate_filter>>>;
  };

  export type MetadataUpdate_orderBy =
    | 'id'
    | 'tokenId'
    | 'key'
    | 'stringValue'
    | 'uint24Value'
    | 'doubleStringValue'
    | 'booleanValue'
    | 'byAddress'
    | 'blockNumber'
    | 'blockTimestamp'
    | 'transactionHash';

  export type NewMint = {
    id: Scalars['Bytes'];
    tokenId: Scalars['BigInt'];
    name: Scalars['String'];
    description: Scalars['String'];
    externalURL: Scalars['String'];
    ENS: Scalars['String'];
    commitHash: Scalars['String'];
    gitRepository: Scalars['String'];
    logo: Scalars['String'];
    color: Scalars['Int'];
    accessPointAutoApproval: Scalars['Boolean'];
    triggeredBy: Scalars['Bytes'];
    owner: Owner;
    blockNumber: Scalars['BigInt'];
    blockTimestamp: Scalars['BigInt'];
    transactionHash: Scalars['Bytes'];
  };

  export type NewMint_filter = {
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
    gitRepository?: InputMaybe<Scalars['String']>;
    gitRepository_not?: InputMaybe<Scalars['String']>;
    gitRepository_gt?: InputMaybe<Scalars['String']>;
    gitRepository_lt?: InputMaybe<Scalars['String']>;
    gitRepository_gte?: InputMaybe<Scalars['String']>;
    gitRepository_lte?: InputMaybe<Scalars['String']>;
    gitRepository_in?: InputMaybe<Array<Scalars['String']>>;
    gitRepository_not_in?: InputMaybe<Array<Scalars['String']>>;
    gitRepository_contains?: InputMaybe<Scalars['String']>;
    gitRepository_contains_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_contains?: InputMaybe<Scalars['String']>;
    gitRepository_not_contains_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_starts_with?: InputMaybe<Scalars['String']>;
    gitRepository_starts_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_starts_with?: InputMaybe<Scalars['String']>;
    gitRepository_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_ends_with?: InputMaybe<Scalars['String']>;
    gitRepository_ends_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_ends_with?: InputMaybe<Scalars['String']>;
    gitRepository_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    logo?: InputMaybe<Scalars['String']>;
    logo_not?: InputMaybe<Scalars['String']>;
    logo_gt?: InputMaybe<Scalars['String']>;
    logo_lt?: InputMaybe<Scalars['String']>;
    logo_gte?: InputMaybe<Scalars['String']>;
    logo_lte?: InputMaybe<Scalars['String']>;
    logo_in?: InputMaybe<Array<Scalars['String']>>;
    logo_not_in?: InputMaybe<Array<Scalars['String']>>;
    logo_contains?: InputMaybe<Scalars['String']>;
    logo_contains_nocase?: InputMaybe<Scalars['String']>;
    logo_not_contains?: InputMaybe<Scalars['String']>;
    logo_not_contains_nocase?: InputMaybe<Scalars['String']>;
    logo_starts_with?: InputMaybe<Scalars['String']>;
    logo_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logo_not_starts_with?: InputMaybe<Scalars['String']>;
    logo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logo_ends_with?: InputMaybe<Scalars['String']>;
    logo_ends_with_nocase?: InputMaybe<Scalars['String']>;
    logo_not_ends_with?: InputMaybe<Scalars['String']>;
    logo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    color?: InputMaybe<Scalars['Int']>;
    color_not?: InputMaybe<Scalars['Int']>;
    color_gt?: InputMaybe<Scalars['Int']>;
    color_lt?: InputMaybe<Scalars['Int']>;
    color_gte?: InputMaybe<Scalars['Int']>;
    color_lte?: InputMaybe<Scalars['Int']>;
    color_in?: InputMaybe<Array<Scalars['Int']>>;
    color_not_in?: InputMaybe<Array<Scalars['Int']>>;
    accessPointAutoApproval?: InputMaybe<Scalars['Boolean']>;
    accessPointAutoApproval_not?: InputMaybe<Scalars['Boolean']>;
    accessPointAutoApproval_in?: InputMaybe<Array<Scalars['Boolean']>>;
    accessPointAutoApproval_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
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
    owner?: InputMaybe<Scalars['String']>;
    owner_not?: InputMaybe<Scalars['String']>;
    owner_gt?: InputMaybe<Scalars['String']>;
    owner_lt?: InputMaybe<Scalars['String']>;
    owner_gte?: InputMaybe<Scalars['String']>;
    owner_lte?: InputMaybe<Scalars['String']>;
    owner_in?: InputMaybe<Array<Scalars['String']>>;
    owner_not_in?: InputMaybe<Array<Scalars['String']>>;
    owner_contains?: InputMaybe<Scalars['String']>;
    owner_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_not_contains?: InputMaybe<Scalars['String']>;
    owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_starts_with?: InputMaybe<Scalars['String']>;
    owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_starts_with?: InputMaybe<Scalars['String']>;
    owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_ends_with?: InputMaybe<Scalars['String']>;
    owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_ends_with?: InputMaybe<Scalars['String']>;
    owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_?: InputMaybe<Owner_filter>;
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
    and?: InputMaybe<Array<InputMaybe<NewMint_filter>>>;
    or?: InputMaybe<Array<InputMaybe<NewMint_filter>>>;
  };

  export type NewMint_orderBy =
    | 'id'
    | 'tokenId'
    | 'name'
    | 'description'
    | 'externalURL'
    | 'ENS'
    | 'commitHash'
    | 'gitRepository'
    | 'logo'
    | 'color'
    | 'accessPointAutoApproval'
    | 'triggeredBy'
    | 'owner'
    | 'owner__id'
    | 'owner__collection'
    | 'blockNumber'
    | 'blockTimestamp'
    | 'transactionHash';

  /** Defines the order direction, either ascending or descending */
  export type OrderDirection = 'asc' | 'desc';

  export type Owner = {
    id: Scalars['Bytes'];
    tokens?: Maybe<Array<Token>>;
    accessPoints?: Maybe<Array<AccessPoint>>;
    collection: Scalars['Boolean'];
  };

  export type OwnertokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
  };

  export type OwneraccessPointsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<AccessPoint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<AccessPoint_filter>;
  };

  export type Owner_filter = {
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
    tokens_?: InputMaybe<Token_filter>;
    accessPoints_?: InputMaybe<AccessPoint_filter>;
    collection?: InputMaybe<Scalars['Boolean']>;
    collection_not?: InputMaybe<Scalars['Boolean']>;
    collection_in?: InputMaybe<Array<Scalars['Boolean']>>;
    collection_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Owner_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Owner_filter>>>;
  };

  export type Owner_orderBy = 'id' | 'tokens' | 'accessPoints' | 'collection';

  export type Query = {
    approval?: Maybe<Approval>;
    approvals: Array<Approval>;
    approvalForAll?: Maybe<ApprovalForAll>;
    approvalForAlls: Array<ApprovalForAll>;
    newMint?: Maybe<NewMint>;
    newMints: Array<NewMint>;
    metadataUpdate?: Maybe<MetadataUpdate>;
    metadataUpdates: Array<MetadataUpdate>;
    transfer?: Maybe<Transfer>;
    transfers: Array<Transfer>;
    token?: Maybe<Token>;
    tokens: Array<Token>;
    owner?: Maybe<Owner>;
    owners: Array<Owner>;
    controller?: Maybe<Controller>;
    controllers: Array<Controller>;
    gitRepository?: Maybe<GitRepository>;
    gitRepositories: Array<GitRepository>;
    accessPoint?: Maybe<AccessPoint>;
    accessPoints: Array<AccessPoint>;
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

  export type QuerynewMintArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerynewMintsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NewMint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NewMint_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymetadataUpdateArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerymetadataUpdatesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MetadataUpdate_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MetadataUpdate_filter>;
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

  export type QuerytokenArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerytokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryownerArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryownersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Owner_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Owner_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerycontrollerArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerycontrollersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Controller_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Controller_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerygitRepositoryArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QuerygitRepositoriesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<GitRepository_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<GitRepository_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryaccessPointArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type QueryaccessPointsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<AccessPoint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<AccessPoint_filter>;
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
    newMint?: Maybe<NewMint>;
    newMints: Array<NewMint>;
    metadataUpdate?: Maybe<MetadataUpdate>;
    metadataUpdates: Array<MetadataUpdate>;
    transfer?: Maybe<Transfer>;
    transfers: Array<Transfer>;
    token?: Maybe<Token>;
    tokens: Array<Token>;
    owner?: Maybe<Owner>;
    owners: Array<Owner>;
    controller?: Maybe<Controller>;
    controllers: Array<Controller>;
    gitRepository?: Maybe<GitRepository>;
    gitRepositories: Array<GitRepository>;
    accessPoint?: Maybe<AccessPoint>;
    accessPoints: Array<AccessPoint>;
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

  export type SubscriptionnewMintArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionnewMintsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NewMint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NewMint_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmetadataUpdateArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionmetadataUpdatesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<MetadataUpdate_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<MetadataUpdate_filter>;
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

  export type SubscriptiontokenArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptiontokensArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Token_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Token_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionownerArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionownersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Owner_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Owner_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptioncontrollerArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptioncontrollersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Controller_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Controller_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptiongitRepositoryArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptiongitRepositoriesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<GitRepository_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<GitRepository_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionaccessPointArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type SubscriptionaccessPointsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<AccessPoint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<AccessPoint_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
  };

  export type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
  };

  export type Token = {
    id: Scalars['Bytes'];
    mintTransaction: NewMint;
    tokenId: Scalars['BigInt'];
    name: Scalars['String'];
    description: Scalars['String'];
    externalURL: Scalars['String'];
    ENS: Scalars['String'];
    logo: Scalars['String'];
    color: Scalars['Int'];
    accessPointAutoApproval: Scalars['Boolean'];
    owner: Owner;
    mintedBy: Scalars['Bytes'];
    controllers?: Maybe<Array<Controller>>;
    gitRepository: GitRepository;
    commitHash: Scalars['String'];
    accessPoints?: Maybe<Array<AccessPoint>>;
  };

  export type TokencontrollersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Controller_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Controller_filter>;
  };

  export type TokenaccessPointsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<AccessPoint_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<AccessPoint_filter>;
  };

  export type Token_filter = {
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
    mintTransaction?: InputMaybe<Scalars['String']>;
    mintTransaction_not?: InputMaybe<Scalars['String']>;
    mintTransaction_gt?: InputMaybe<Scalars['String']>;
    mintTransaction_lt?: InputMaybe<Scalars['String']>;
    mintTransaction_gte?: InputMaybe<Scalars['String']>;
    mintTransaction_lte?: InputMaybe<Scalars['String']>;
    mintTransaction_in?: InputMaybe<Array<Scalars['String']>>;
    mintTransaction_not_in?: InputMaybe<Array<Scalars['String']>>;
    mintTransaction_contains?: InputMaybe<Scalars['String']>;
    mintTransaction_contains_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_not_contains?: InputMaybe<Scalars['String']>;
    mintTransaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_starts_with?: InputMaybe<Scalars['String']>;
    mintTransaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_not_starts_with?: InputMaybe<Scalars['String']>;
    mintTransaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_ends_with?: InputMaybe<Scalars['String']>;
    mintTransaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_not_ends_with?: InputMaybe<Scalars['String']>;
    mintTransaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    mintTransaction_?: InputMaybe<NewMint_filter>;
    tokenId?: InputMaybe<Scalars['BigInt']>;
    tokenId_not?: InputMaybe<Scalars['BigInt']>;
    tokenId_gt?: InputMaybe<Scalars['BigInt']>;
    tokenId_lt?: InputMaybe<Scalars['BigInt']>;
    tokenId_gte?: InputMaybe<Scalars['BigInt']>;
    tokenId_lte?: InputMaybe<Scalars['BigInt']>;
    tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
    logo?: InputMaybe<Scalars['String']>;
    logo_not?: InputMaybe<Scalars['String']>;
    logo_gt?: InputMaybe<Scalars['String']>;
    logo_lt?: InputMaybe<Scalars['String']>;
    logo_gte?: InputMaybe<Scalars['String']>;
    logo_lte?: InputMaybe<Scalars['String']>;
    logo_in?: InputMaybe<Array<Scalars['String']>>;
    logo_not_in?: InputMaybe<Array<Scalars['String']>>;
    logo_contains?: InputMaybe<Scalars['String']>;
    logo_contains_nocase?: InputMaybe<Scalars['String']>;
    logo_not_contains?: InputMaybe<Scalars['String']>;
    logo_not_contains_nocase?: InputMaybe<Scalars['String']>;
    logo_starts_with?: InputMaybe<Scalars['String']>;
    logo_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logo_not_starts_with?: InputMaybe<Scalars['String']>;
    logo_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    logo_ends_with?: InputMaybe<Scalars['String']>;
    logo_ends_with_nocase?: InputMaybe<Scalars['String']>;
    logo_not_ends_with?: InputMaybe<Scalars['String']>;
    logo_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    color?: InputMaybe<Scalars['Int']>;
    color_not?: InputMaybe<Scalars['Int']>;
    color_gt?: InputMaybe<Scalars['Int']>;
    color_lt?: InputMaybe<Scalars['Int']>;
    color_gte?: InputMaybe<Scalars['Int']>;
    color_lte?: InputMaybe<Scalars['Int']>;
    color_in?: InputMaybe<Array<Scalars['Int']>>;
    color_not_in?: InputMaybe<Array<Scalars['Int']>>;
    accessPointAutoApproval?: InputMaybe<Scalars['Boolean']>;
    accessPointAutoApproval_not?: InputMaybe<Scalars['Boolean']>;
    accessPointAutoApproval_in?: InputMaybe<Array<Scalars['Boolean']>>;
    accessPointAutoApproval_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    owner?: InputMaybe<Scalars['String']>;
    owner_not?: InputMaybe<Scalars['String']>;
    owner_gt?: InputMaybe<Scalars['String']>;
    owner_lt?: InputMaybe<Scalars['String']>;
    owner_gte?: InputMaybe<Scalars['String']>;
    owner_lte?: InputMaybe<Scalars['String']>;
    owner_in?: InputMaybe<Array<Scalars['String']>>;
    owner_not_in?: InputMaybe<Array<Scalars['String']>>;
    owner_contains?: InputMaybe<Scalars['String']>;
    owner_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_not_contains?: InputMaybe<Scalars['String']>;
    owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
    owner_starts_with?: InputMaybe<Scalars['String']>;
    owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_starts_with?: InputMaybe<Scalars['String']>;
    owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    owner_ends_with?: InputMaybe<Scalars['String']>;
    owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_not_ends_with?: InputMaybe<Scalars['String']>;
    owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    owner_?: InputMaybe<Owner_filter>;
    mintedBy?: InputMaybe<Scalars['Bytes']>;
    mintedBy_not?: InputMaybe<Scalars['Bytes']>;
    mintedBy_gt?: InputMaybe<Scalars['Bytes']>;
    mintedBy_lt?: InputMaybe<Scalars['Bytes']>;
    mintedBy_gte?: InputMaybe<Scalars['Bytes']>;
    mintedBy_lte?: InputMaybe<Scalars['Bytes']>;
    mintedBy_in?: InputMaybe<Array<Scalars['Bytes']>>;
    mintedBy_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    mintedBy_contains?: InputMaybe<Scalars['Bytes']>;
    mintedBy_not_contains?: InputMaybe<Scalars['Bytes']>;
    controllers?: InputMaybe<Array<Scalars['String']>>;
    controllers_not?: InputMaybe<Array<Scalars['String']>>;
    controllers_contains?: InputMaybe<Array<Scalars['String']>>;
    controllers_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    controllers_not_contains?: InputMaybe<Array<Scalars['String']>>;
    controllers_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    controllers_?: InputMaybe<Controller_filter>;
    gitRepository?: InputMaybe<Scalars['String']>;
    gitRepository_not?: InputMaybe<Scalars['String']>;
    gitRepository_gt?: InputMaybe<Scalars['String']>;
    gitRepository_lt?: InputMaybe<Scalars['String']>;
    gitRepository_gte?: InputMaybe<Scalars['String']>;
    gitRepository_lte?: InputMaybe<Scalars['String']>;
    gitRepository_in?: InputMaybe<Array<Scalars['String']>>;
    gitRepository_not_in?: InputMaybe<Array<Scalars['String']>>;
    gitRepository_contains?: InputMaybe<Scalars['String']>;
    gitRepository_contains_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_contains?: InputMaybe<Scalars['String']>;
    gitRepository_not_contains_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_starts_with?: InputMaybe<Scalars['String']>;
    gitRepository_starts_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_starts_with?: InputMaybe<Scalars['String']>;
    gitRepository_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_ends_with?: InputMaybe<Scalars['String']>;
    gitRepository_ends_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_not_ends_with?: InputMaybe<Scalars['String']>;
    gitRepository_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    gitRepository_?: InputMaybe<GitRepository_filter>;
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
    accessPoints_?: InputMaybe<AccessPoint_filter>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  };

  export type Token_orderBy =
    | 'id'
    | 'mintTransaction'
    | 'mintTransaction__id'
    | 'mintTransaction__tokenId'
    | 'mintTransaction__name'
    | 'mintTransaction__description'
    | 'mintTransaction__externalURL'
    | 'mintTransaction__ENS'
    | 'mintTransaction__commitHash'
    | 'mintTransaction__gitRepository'
    | 'mintTransaction__logo'
    | 'mintTransaction__color'
    | 'mintTransaction__accessPointAutoApproval'
    | 'mintTransaction__triggeredBy'
    | 'mintTransaction__blockNumber'
    | 'mintTransaction__blockTimestamp'
    | 'mintTransaction__transactionHash'
    | 'tokenId'
    | 'name'
    | 'description'
    | 'externalURL'
    | 'ENS'
    | 'logo'
    | 'color'
    | 'accessPointAutoApproval'
    | 'owner'
    | 'owner__id'
    | 'owner__collection'
    | 'mintedBy'
    | 'controllers'
    | 'gitRepository'
    | 'gitRepository__id'
    | 'commitHash'
    | 'accessPoints';

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
    and?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
    or?: InputMaybe<Array<InputMaybe<Transfer_filter>>>;
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
    newMint: InContextSdkMethod<
      Query['newMint'],
      QuerynewMintArgs,
      MeshContext
    >;
    /** null **/
    newMints: InContextSdkMethod<
      Query['newMints'],
      QuerynewMintsArgs,
      MeshContext
    >;
    /** null **/
    metadataUpdate: InContextSdkMethod<
      Query['metadataUpdate'],
      QuerymetadataUpdateArgs,
      MeshContext
    >;
    /** null **/
    metadataUpdates: InContextSdkMethod<
      Query['metadataUpdates'],
      QuerymetadataUpdatesArgs,
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
    /** null **/
    token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>;
    /** null **/
    tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>;
    /** null **/
    owner: InContextSdkMethod<Query['owner'], QueryownerArgs, MeshContext>;
    /** null **/
    owners: InContextSdkMethod<Query['owners'], QueryownersArgs, MeshContext>;
    /** null **/
    controller: InContextSdkMethod<
      Query['controller'],
      QuerycontrollerArgs,
      MeshContext
    >;
    /** null **/
    controllers: InContextSdkMethod<
      Query['controllers'],
      QuerycontrollersArgs,
      MeshContext
    >;
    /** null **/
    gitRepository: InContextSdkMethod<
      Query['gitRepository'],
      QuerygitRepositoryArgs,
      MeshContext
    >;
    /** null **/
    gitRepositories: InContextSdkMethod<
      Query['gitRepositories'],
      QuerygitRepositoriesArgs,
      MeshContext
    >;
    /** null **/
    accessPoint: InContextSdkMethod<
      Query['accessPoint'],
      QueryaccessPointArgs,
      MeshContext
    >;
    /** null **/
    accessPoints: InContextSdkMethod<
      Query['accessPoints'],
      QueryaccessPointsArgs,
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
    newMint: InContextSdkMethod<
      Subscription['newMint'],
      SubscriptionnewMintArgs,
      MeshContext
    >;
    /** null **/
    newMints: InContextSdkMethod<
      Subscription['newMints'],
      SubscriptionnewMintsArgs,
      MeshContext
    >;
    /** null **/
    metadataUpdate: InContextSdkMethod<
      Subscription['metadataUpdate'],
      SubscriptionmetadataUpdateArgs,
      MeshContext
    >;
    /** null **/
    metadataUpdates: InContextSdkMethod<
      Subscription['metadataUpdates'],
      SubscriptionmetadataUpdatesArgs,
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
    /** null **/
    token: InContextSdkMethod<
      Subscription['token'],
      SubscriptiontokenArgs,
      MeshContext
    >;
    /** null **/
    tokens: InContextSdkMethod<
      Subscription['tokens'],
      SubscriptiontokensArgs,
      MeshContext
    >;
    /** null **/
    owner: InContextSdkMethod<
      Subscription['owner'],
      SubscriptionownerArgs,
      MeshContext
    >;
    /** null **/
    owners: InContextSdkMethod<
      Subscription['owners'],
      SubscriptionownersArgs,
      MeshContext
    >;
    /** null **/
    controller: InContextSdkMethod<
      Subscription['controller'],
      SubscriptioncontrollerArgs,
      MeshContext
    >;
    /** null **/
    controllers: InContextSdkMethod<
      Subscription['controllers'],
      SubscriptioncontrollersArgs,
      MeshContext
    >;
    /** null **/
    gitRepository: InContextSdkMethod<
      Subscription['gitRepository'],
      SubscriptiongitRepositoryArgs,
      MeshContext
    >;
    /** null **/
    gitRepositories: InContextSdkMethod<
      Subscription['gitRepositories'],
      SubscriptiongitRepositoriesArgs,
      MeshContext
    >;
    /** null **/
    accessPoint: InContextSdkMethod<
      Subscription['accessPoint'],
      SubscriptionaccessPointArgs,
      MeshContext
    >;
    /** null **/
    accessPoints: InContextSdkMethod<
      Subscription['accessPoints'],
      SubscriptionaccessPointsArgs,
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
