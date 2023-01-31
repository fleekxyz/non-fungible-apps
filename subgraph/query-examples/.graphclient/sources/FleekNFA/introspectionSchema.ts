// @ts-nocheck
import { buildASTSchema } from 'graphql';

const schemaAST = {
  kind: 'Document',
  definitions: [
    {
      kind: 'SchemaDefinition',
      operationTypes: [
        {
          kind: 'OperationTypeDefinition',
          operation: 'query',
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Query',
            },
          },
        },
        {
          kind: 'OperationTypeDefinition',
          operation: 'subscription',
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Subscription',
            },
          },
        },
      ],
      directives: [],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value:
          'Marks the GraphQL type as indexable entity.  Each type that should be an entity is required to be annotated with this directive.',
      },
      name: {
        kind: 'Name',
        value: 'entity',
      },
      arguments: [],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'OBJECT',
        },
      ],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value: 'Defined a Subgraph ID for an object type',
      },
      name: {
        kind: 'Name',
        value: 'subgraphId',
      },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'OBJECT',
        },
      ],
    },
    {
      kind: 'DirectiveDefinition',
      description: {
        kind: 'StringValue',
        value:
          'creates a virtual field on the entity that may be queried but cannot be set manually through the mappings API.',
      },
      name: {
        kind: 'Name',
        value: 'derivedFrom',
      },
      arguments: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'field',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
      ],
      repeatable: false,
      locations: [
        {
          kind: 'Name',
          value: 'FIELD_DEFINITION',
        },
      ],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Approval',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ApprovalForAll',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'operator',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Boolean',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ApprovalForAll_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Boolean',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Boolean',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Boolean',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'ApprovalForAll_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'operator',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Approval_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Approval_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'owner',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'approved',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BigDecimal',
      },
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BigInt',
      },
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'BlockChangedFilter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number_gte',
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Block_height',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'hash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'number_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ScalarTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Bytes',
      },
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleGranted',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleGranted_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleGranted_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleRevoked',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleRevoked_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'CollectionRoleRevoked_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewBuild',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewBuild_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewBuild_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'commitHash',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenDescription',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'description',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenDescription_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'description_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenDescription_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'description',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenENS',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'ENS',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenENS_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenENS_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'ENS',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenExternalURL',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenExternalURL_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenExternalURL_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'externalURL',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenImage',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'image',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenImage_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'image_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenImage_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'image',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenName',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'name',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenName_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'token_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'String',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_contains_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_starts_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_starts_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_ends_with',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'name_not_ends_with_nocase',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'String',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'NewTokenName_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'token',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'name',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'triggeredBy',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'Defines the order direction, either ascending or descending',
        block: true,
      },
      name: {
        kind: 'Name',
        value: 'OrderDirection',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'asc',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'desc',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Query',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approval',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Approval',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvals',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Approval_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Approval_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Approval',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvalForAll',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ApprovalForAll',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvalForAlls',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ApprovalForAll_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ApprovalForAll_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ApprovalForAll',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleGranted',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'CollectionRoleGranted',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleGranteds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleGranted_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleGranted_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'CollectionRoleGranted',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleRevoked',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'CollectionRoleRevoked',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleRevokeds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleRevoked_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleRevoked_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'CollectionRoleRevoked',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newBuild',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewBuild',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newBuilds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewBuild_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewBuild_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewBuild',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenDescription',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenDescription',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenDescriptions',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenDescription_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenDescription_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenDescription',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenENS',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenENS',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenENSs',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenENS_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenENS_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenENS',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenExternalURL',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenExternalURL',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenExternalURLs',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenExternalURL_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenExternalURL_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenExternalURL',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenImage',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenImage',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenImages',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenImage_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenImage_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenImage',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenName',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenName',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenNames',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenName_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenName_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenName',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleGranted',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'TokenRoleGranted',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleGranteds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleGranted_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleGranted_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'TokenRoleGranted',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleRevoked',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'TokenRoleRevoked',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleRevokeds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleRevoked_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleRevoked_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'TokenRoleRevoked',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transfer',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Transfer',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transfers',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Transfer_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Transfer_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Transfer',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Access to subgraph metadata',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_meta',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: '_Meta_',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Subscription',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approval',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Approval',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvals',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Approval_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Approval_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Approval',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvalForAll',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'ApprovalForAll',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'approvalForAlls',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ApprovalForAll_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'ApprovalForAll_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ApprovalForAll',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleGranted',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'CollectionRoleGranted',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleGranteds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleGranted_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleGranted_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'CollectionRoleGranted',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleRevoked',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'CollectionRoleRevoked',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'collectionRoleRevokeds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleRevoked_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'CollectionRoleRevoked_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'CollectionRoleRevoked',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newBuild',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewBuild',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newBuilds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewBuild_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewBuild_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewBuild',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenDescription',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenDescription',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenDescriptions',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenDescription_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenDescription_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenDescription',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenENS',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenENS',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenENSs',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenENS_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenENS_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenENS',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenExternalURL',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenExternalURL',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenExternalURLs',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenExternalURL_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenExternalURL_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenExternalURL',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenImage',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenImage',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenImages',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenImage_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenImage_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenImage',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenName',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'NewTokenName',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'newTokenNames',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenName_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'NewTokenName_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'NewTokenName',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleGranted',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'TokenRoleGranted',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleGranteds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleGranted_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleGranted_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'TokenRoleGranted',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleRevoked',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'TokenRoleRevoked',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenRoleRevokeds',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleRevoked_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'TokenRoleRevoked_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'TokenRoleRevoked',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transfer',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'id',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'ID',
                  },
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Transfer',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transfers',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'skip',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '0',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'first',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
              defaultValue: {
                kind: 'IntValue',
                value: '100',
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderBy',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Transfer_orderBy',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'orderDirection',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'OrderDirection',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'where',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Transfer_filter',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'The block at which the query should be executed. Can either be a `{ hash: Bytes }` value containing a block hash, a `{ number: Int }` containing the block number, or a `{ number_gte: Int }` containing the minimum block number. In the case of `number_gte`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
            {
              kind: 'InputValueDefinition',
              description: {
                kind: 'StringValue',
                value:
                  'Set to `allow` to receive data even if the subgraph has skipped over errors while syncing.',
                block: true,
              },
              name: {
                kind: 'Name',
                value: 'subgraphError',
              },
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: '_SubgraphErrorPolicy_',
                  },
                },
              },
              defaultValue: {
                kind: 'EnumValue',
                value: 'deny',
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: {
                    kind: 'Name',
                    value: 'Transfer',
                  },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'Access to subgraph metadata',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_meta',
          },
          arguments: [
            {
              kind: 'InputValueDefinition',
              name: {
                kind: 'Name',
                value: 'block',
              },
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Block_height',
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: '_Meta_',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleGranted',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleGranted_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleGranted_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleRevoked',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleRevoked_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'role_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Int',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'TokenRoleRevoked_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'role',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'toAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'byAddress',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Transfer',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'from',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'to',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'BigInt',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Bytes',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'InputObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Transfer_filter',
      },
      fields: [
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'id_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'from_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'to_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BigInt',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'BigInt',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lt',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_gte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_lte',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_in',
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: {
                  kind: 'Name',
                  value: 'Bytes',
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash_not_contains',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'InputValueDefinition',
          description: {
            kind: 'StringValue',
            value: 'Filter for the block changed event.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: '_change_block',
          },
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'BlockChangedFilter',
            },
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: 'Transfer_orderBy',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'id',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'from',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'to',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'tokenId',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockNumber',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'blockTimestamp',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          name: {
            kind: 'Name',
            value: 'transactionHash',
          },
          directives: [],
        },
      ],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      name: {
        kind: 'Name',
        value: '_Block_',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The hash of the block',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'hash',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Bytes',
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The block number',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'number',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Int',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              'Integer representation of the timestamp stored in blocks for the chain',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'timestamp',
          },
          arguments: [],
          type: {
            kind: 'NamedType',
            name: {
              kind: 'Name',
              value: 'Int',
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'ObjectTypeDefinition',
      description: {
        kind: 'StringValue',
        value: 'The type for the top-level _meta field',
        block: true,
      },
      name: {
        kind: 'Name',
        value: '_Meta_',
      },
      fields: [
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              'Information about a specific subgraph block. The hash of the block\nwill be null if the _meta field has a block constraint that asks for\na block number. It will be filled if the _meta field has no block constraint\nand therefore asks for the latest  block\n',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'block',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: '_Block_',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value: 'The deployment ID',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'deployment',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'String',
              },
            },
          },
          directives: [],
        },
        {
          kind: 'FieldDefinition',
          description: {
            kind: 'StringValue',
            value:
              'If `true`, the subgraph encountered indexing errors at some past block',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'hasIndexingErrors',
          },
          arguments: [],
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'Boolean',
              },
            },
          },
          directives: [],
        },
      ],
      interfaces: [],
      directives: [],
    },
    {
      kind: 'EnumTypeDefinition',
      name: {
        kind: 'Name',
        value: '_SubgraphErrorPolicy_',
      },
      values: [
        {
          kind: 'EnumValueDefinition',
          description: {
            kind: 'StringValue',
            value:
              'Data will be returned even if the subgraph has indexing errors',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'allow',
          },
          directives: [],
        },
        {
          kind: 'EnumValueDefinition',
          description: {
            kind: 'StringValue',
            value:
              'If the subgraph has indexing errors, data will be omitted. The default.',
            block: true,
          },
          name: {
            kind: 'Name',
            value: 'deny',
          },
          directives: [],
        },
      ],
      directives: [],
    },
  ],
};

export default buildASTSchema(schemaAST, {
  assumeValid: true,
  assumeValidSDL: true,
});
