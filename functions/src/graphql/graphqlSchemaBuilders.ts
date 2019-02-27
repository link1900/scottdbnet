import { DocumentNode, FieldDefinitionNode, GraphQLSchema, GraphQLNonNull, GraphQLScalarType } from 'graphql';
import { gql } from 'apollo-server-core';
import { makeExecutableSchema } from './graphqlTools';
import {
  ContextGeneratorFunction,
  EnumOptions,
  GraphqlDefinitionKind,
  GraphqlInfo,
  GraphqlRoot,
  GraphqlSchemaDefinition,
  GraphqlSchemaParts,
  GraphqlTypeDefinition,
  MutationArgs,
  MutationOptions,
  QueryOptions,
  ResolverFunction,
  ResolverMiddleware,
  ScalarOptions,
  TypeOptions,
  Context,
  NodeTypes,
  NodeType,
  RootResolverType,
  DirectiveOptions
} from './graphqlSchemaTypes';
import { base64Decode, base64Encode } from '../util/stringHelper';
import { SchemaDirectiveVisitor } from 'apollo-server-cloud-functions';

export const rootDefinition = gql`
  interface Node {
    id: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    ping: Boolean!
    node(id: ID!): Node
    nodes(ids: [ID]!): [Node]!
  }

  type Mutation {
    ping: Boolean!
  }
`;

export const rootResolver: RootResolverType = {
  Query: {
    ping: () => true,
    node: mainNodeResolver,
    nodes: nodesResolver
  },
  Mutation: {
    ping: () => true
  },
  Node: {
    __resolveType: nodeTypeResolver
  }
};

export const rootDirectives: Record<string, typeof SchemaDirectiveVisitor> = {};

const nodeTypes: NodeTypes = {};

export function addNodeType({ name, type, resolver }: NodeType) {
  nodeTypes[name] = {
    name,
    type,
    resolver
  };
}

function mainNodeResolver(obj: any, { id }: { id: string }, context: Context, info: any) {
  return nodeIdFetcher(id, context, info);
}

function nodesResolver(obj: any, { ids }: { ids: string[] }, context: Context, info: any) {
  return Promise.all(ids.map(id => Promise.resolve(nodeIdFetcher(id, context, info))));
}

export function fromGlobalId(globalId: string) {
  const decodedGlobalId = base64Decode(globalId);
  const delimiterPos = decodedGlobalId.indexOf(':');
  return {
    type: decodedGlobalId.substring(0, delimiterPos),
    id: decodedGlobalId.substring(delimiterPos + 1)
  };
}

export function toGlobalId(type: string, id: string): string {
  return base64Encode([type, id].join(':'));
}

function nodeIdFetcher(globalId: string, context: Context, info: any) {
  const { type, id } = fromGlobalId(globalId);
  const nodeType = nodeTypes[type];
  if (nodeType && nodeType.resolver) {
    return nodeType.resolver(id, context).then((result: any) => {
      if (!result) return null;
      result.graphqlType = type;
      return result;
    });
  } else {
    return null;
  }
}

function nodeTypeResolver(obj: any) {
  if (obj.graphqlType) {
    return obj.graphqlType;
  }
  return null;
}

export function createMutation(mutationOptions: MutationOptions): GraphqlTypeDefinition {
  const { name, definition, resolver: mutationFunction } = mutationOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.MUTATION,
    definition,
    resolver: function mutateAndGetPayload(root: GraphqlRoot, args: MutationArgs, context: Context, info: GraphqlInfo) {
      const { input } = args;
      return mutationFunction(input, context, info);
    }
  };
}

export function createQuery(queryOptions: QueryOptions): GraphqlTypeDefinition {
  const { name, definition, resolver } = queryOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.QUERY,
    definition,
    resolver
  };
}

export function createType(typeOptions: TypeOptions): GraphqlTypeDefinition {
  const { name, definition, resolver, nodeResolver, hasConnection } = typeOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.TYPE,
    definition,
    resolver,
    nodeResolver,
    hasConnection
  };
}

export function createScalar(scalarOptions: ScalarOptions): GraphqlTypeDefinition {
  const { name, definition, scalar } = scalarOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.SCALAR,
    definition,
    resolver: scalar
  };
}

export function createEnum(enumOptions: EnumOptions): GraphqlTypeDefinition {
  const { name, definition, resolver } = enumOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.ENUM,
    definition,
    resolver
  };
}

export function createDirective(directiveOptions: DirectiveOptions): GraphqlTypeDefinition {
  const { name, definition, resolver } = directiveOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.DIRECTIVE,
    definition,
    resolver
  };
}

export function applyMiddlewaresToResolver(
  resolver: ResolverFunction,
  middlewares: ResolverMiddleware[]
): ResolverFunction {
  return middlewares.reduce((previousResolver: ResolverFunction, middleware: ResolverMiddleware) => {
    return middleware(previousResolver);
  }, resolver);
}

export function applyGeneratorMiddlewares(
  base: ContextGeneratorFunction,
  middlewares: ContextGeneratorFunction[]
): ContextGeneratorFunction {
  return middlewares.reduce((previousValue, middleware) => {
    return function generatorMiddleware(request: Request, context?: Context) {
      return middleware(request, previousValue(request, context));
    };
  }, base);
}

export function createGraphqlSchemaParts(graphqlSchemaDefinition: GraphqlSchemaDefinition): GraphqlSchemaParts {
  const {
    contextFromRequestGenerator,
    mutationMiddlewares = [],
    resolverMiddlewares = [],
    contextGeneratorMiddlewares = []
  } = graphqlSchemaDefinition;
  const typeDefs: DocumentNode[] = [rootDefinition];
  const resolvers = rootResolver;
  const directives = rootDirectives;

  graphqlSchemaDefinition.graphqlTypeDefinitions.forEach(graphqlTypeDefinition => {
    typeDefs.push(graphqlTypeDefinition.definition);
    if (graphqlTypeDefinition.kind === GraphqlDefinitionKind.QUERY) {
      const queryResolver = graphqlTypeDefinition.resolver as ResolverFunction;
      resolvers.Query[graphqlTypeDefinition.name] = applyMiddlewaresToResolver(queryResolver, resolverMiddlewares);
    }
    if (graphqlTypeDefinition.kind === GraphqlDefinitionKind.MUTATION) {
      const mutationResolver = graphqlTypeDefinition.resolver as ResolverFunction;
      resolvers.Mutation[graphqlTypeDefinition.name] = applyMiddlewaresToResolver(
        mutationResolver,
        resolverMiddlewares.concat(mutationMiddlewares)
      );
    }
    if (
      graphqlTypeDefinition.kind === GraphqlDefinitionKind.SCALAR ||
      graphqlTypeDefinition.kind === GraphqlDefinitionKind.ENUM
    ) {
      resolvers[graphqlTypeDefinition.name] = graphqlTypeDefinition.resolver;
    }

    if (graphqlTypeDefinition.kind === GraphqlDefinitionKind.TYPE) {
      if (graphqlTypeDefinition.nodeResolver) {
        addNodeType({
          name: graphqlTypeDefinition.name,
          type: graphqlTypeDefinition.definition,
          resolver: graphqlTypeDefinition.nodeResolver
        });
      }
      if (graphqlTypeDefinition.hasConnection === true) {
        const edgeName = `${graphqlTypeDefinition.name}Edge`;
        const connectionName = `${graphqlTypeDefinition.name}Connection`;
        const connectionResolver = {};
        const edgeResolver = {};
        const connectionDefinition = gql`  
          type ${connectionName} {
            pageInfo: PageInfo!
            edges: [${edgeName}]
          }
        `;
        const edgeDefinition = gql`
          type ${edgeName} {
            node: ${graphqlTypeDefinition.name}
            cursor: String!
          }
        `;

        // add the connection
        typeDefs.push(connectionDefinition);
        resolvers[connectionName] = connectionResolver;

        // add the definition
        typeDefs.push(edgeDefinition);
        resolvers[edgeName] = edgeResolver;

        const fieldDefinitions = getFieldDefinitionsForObject(graphqlTypeDefinition.definition);
        const fieldOrderString = fieldDefinitions
          .filter(canOrderFieldDefinition)
          .map(fieldDefinition => {
            return [`${fieldDefinition.name.value}_ASC`, `${fieldDefinition.name.value}_DESC`];
          })
          .flat()
          .join('\n');

        // add the order by enum
        const orderByName = `${graphqlTypeDefinition.name}OrderBy`;
        const orderByDefinition = gql`
          enum ${orderByName} {
            ${fieldOrderString}
          }
        `;
        typeDefs.push(orderByDefinition);

        // add the filters
        const filterFieldString = fieldDefinitions
          .filter(canFilterFieldDefinition)
          .map(filtersForField)
          .flat()
          .join('\n');
        const filterName = `${graphqlTypeDefinition.name}Filter`;
        const filterDefinition = gql`
          input ${filterName} {
            AND: [${filterName}!]
            OR: [${filterName}!]
            ${filterFieldString}
          }
        `;
        typeDefs.push(filterDefinition);
      }

      resolvers[graphqlTypeDefinition.name] = graphqlTypeDefinition.resolver;
    }

    if (graphqlTypeDefinition.kind === GraphqlDefinitionKind.DIRECTIVE) {
      // @ts-ignore
      directives[graphqlTypeDefinition.name] = graphqlTypeDefinition.resolver;
    }
  });

  const contextGenerator = (wrapper: { req: Request }): Context => {
    return applyGeneratorMiddlewares(contextFromRequestGenerator, contextGeneratorMiddlewares)(wrapper.req);
  };

  return {
    contextGenerator,
    typeDefs,
    resolvers,
    directives
  };
}

export function getGraphqlSchemaFromDefinition(graphqlSchemaDefinition: GraphqlSchemaDefinition): GraphQLSchema {
  const graphqlSchemaParts = createGraphqlSchemaParts(graphqlSchemaDefinition);
  return makeExecutableSchema({
    typeDefs: graphqlSchemaParts.typeDefs,
    resolvers: graphqlSchemaParts.resolvers
  });
}

function getFieldDefinitionsForObject(node: DocumentNode): ReadonlyArray<FieldDefinitionNode> {
  if (node.definitions.length === 0) {
    return [];
  }

  const firstField = node.definitions[0];
  if (firstField.kind !== 'ObjectTypeDefinition') {
    return [];
  }

  if (!firstField || !firstField.fields) {
    return [];
  }

  return firstField.fields;
}

const allowedOrderByTypes = ['String', 'DateTime', 'Boolean', 'ID'];

function canOrderFieldDefinition(fieldDefinition: FieldDefinitionNode): boolean {
  if (fieldDefinition.type.kind === 'NamedType') {
    return allowedOrderByTypes.includes(fieldDefinition.type.name.value);
  }

  if (fieldDefinition.type.kind === 'NonNullType') {
    if (fieldDefinition.type.type.kind === 'NamedType') {
      return allowedOrderByTypes.includes(fieldDefinition.type.type.name.value);
    }
  }
  return false;
}

const allowedFilterTypes = ['ID', 'String', 'Int', 'Float', 'Boolean', 'DateTime', 'Enum'];

function canFilterFieldDefinition(fieldDefinition: FieldDefinitionNode): boolean {
  if (fieldDefinition.type.kind === 'NamedType') {
    return allowedFilterTypes.includes(fieldDefinition.type.name.value);
  }

  if (fieldDefinition.type.kind === 'NonNullType') {
    if (fieldDefinition.type.type.kind === 'NamedType') {
      return allowedFilterTypes.includes(fieldDefinition.type.type.name.value);
    }
  }
  return false;
}

function getFieldType(fieldDefinition: FieldDefinitionNode): string | undefined {
  if (fieldDefinition.type.kind === 'NamedType') {
    return fieldDefinition.type.name.value;
  }

  if (fieldDefinition.type.kind === 'NonNullType') {
    if (fieldDefinition.type.type.kind === 'NamedType') {
      return fieldDefinition.type.type.name.value;
    }
  }
  return undefined;
}

function getFieldName(fieldDefinition: FieldDefinitionNode): string | undefined {
  if (fieldDefinition.type.kind === 'NamedType') {
    return fieldDefinition.name.value;
  }

  if (fieldDefinition.type.kind === 'NonNullType') {
    if (fieldDefinition.type.type.kind === 'NamedType') {
      return fieldDefinition.name.value;
    }
  }
  return undefined;
}

function filtersForField(fieldDefinition: FieldDefinitionNode): string[] {
  const fieldName = getFieldName(fieldDefinition);
  const fieldType = getFieldType(fieldDefinition);

  if (!fieldType) {
    return [];
  }

  if (fieldType === 'DateTime') {
    return [
      `${fieldName}_equal: DateTime # matches all nodes with exact value`,
      `${fieldName}_not: DateTime # matches all nodes with different value`,
      `${fieldName}_in: [DateTime!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [DateTime!] # matches all nodes with value not in the passed list`,
      `${fieldName}_lt: DateTime # matches all nodes with lesser value`,
      `${fieldName}_lte: DateTime # matches all nodes with lesser or equal value`,
      `${fieldName}_gt: DateTime # matches all nodes with greater value`,
      `${fieldName}_gte: DateTime # matches all nodes with greater or equal value`
    ];
  }

  if (fieldType === 'Float') {
    return [
      `${fieldName}_equal: Float # matches all nodes with exact value`,
      `${fieldName}_not: Float # matches all nodes with different value`,
      `${fieldName}_in: [Float!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [Float!] # matches all nodes with value not in the passed list`,
      `${fieldName}_lt: Float # matches all nodes with lesser value`,
      `${fieldName}_lte: Float # matches all nodes with lesser or equal value`,
      `${fieldName}_gt: Float # matches all nodes with greater value`,
      `${fieldName}_gte: Float # matches all nodes with greater or equal value`
    ];
  }

  if (fieldType === 'Integer') {
    return [
      `${fieldName}_equal: Integer # matches all nodes with exact value`,
      `${fieldName}_not: Integer # matches all nodes with different value`,
      `${fieldName}_in: [Integer!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [Integer!] # matches all nodes with value not in the passed list`,
      `${fieldName}_lt: Integer # matches all nodes with lesser value`,
      `${fieldName}_lte: Integer # matches all nodes with lesser or equal value`,
      `${fieldName}_gt: Integer # matches all nodes with greater value`,
      `${fieldName}_gte: Integer # matches all nodes with greater or equal value`
    ];
  }

  if (fieldType === 'String') {
    return [
      `${fieldName}_equal: String # matches all nodes with exact value`,
      `${fieldName}_not: String # matches all nodes with different value`,
      `${fieldName}_in: [String!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [String!] # matches all nodes with value not in the passed list`,
      `${fieldName}_lt: String # matches all nodes with lesser value`,
      `${fieldName}_lte: String # matches all nodes with lesser or equal value`,
      `${fieldName}_gt: String # matches all nodes with greater value`,
      `${fieldName}_gte: String # matches all nodes with greater or equal value`,
      `${fieldName}_contains: String # matches all nodes with a value that contains given substring`,
      `${fieldName}_notContains: String # matches all nodes with a value that does not contain given substring`,
      `${fieldName}_startsWith: String # matches all nodes with a value that starts with given substring`,
      `${fieldName}_notStartsWith: String # matches all nodes with a value that does not start with given substring`,
      `${fieldName}_endsWith: String # matches all nodes with a value that ends with given substring`,
      `${fieldName}_notEndsWith: String # matches all nodes with a value that does not end with given substring`
    ];
  }

  if (fieldType === 'ID') {
    return [
      `${fieldName}_equal: ID # matches all nodes with exact value`,
      `${fieldName}_not: ID # matches all nodes with different value`,
      `${fieldName}_in: [ID!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [ID!] # matches all nodes with value not in the passed list`,
      `${fieldName}_lt: ID # matches all nodes with lesser value`,
      `${fieldName}_lte: ID # matches all nodes with lesser or equal value`,
      `${fieldName}_gt: ID # matches all nodes with greater value`,
      `${fieldName}_gte: ID # matches all nodes with greater or equal value`,
      `${fieldName}_contains: ID # matches all nodes with a value that contains given substring`,
      `${fieldName}_notContains: ID # matches all nodes with a value that does not contain given substring`,
      `${fieldName}_startsWith: ID # matches all nodes with a value that starts with given substring`,
      `${fieldName}_notStartsWith: ID # matches all nodes with a value that does not start with given substring`,
      `${fieldName}_endsWith: ID # matches all nodes with a value that ends with given substring`,
      `${fieldName}_notEndsWith: ID # matches all nodes with a value that does not end with given substring`
    ];
  }

  if (fieldType === 'Enum') {
    return [
      `${fieldName}_equal: ${fieldType} # matches all nodes with exact value`,
      `${fieldName}_not: ${fieldType} # matches all nodes with different value`,
      `${fieldName}_in: [${fieldType}!] # matches all nodes with value in the passed list`,
      `${fieldName}_notIn: [${fieldType}!] # matches all nodes with value not in the passed list`
    ];
  }

  if (fieldType === 'Boolean') {
    return [
      `${fieldName}_equal: Boolean # matches all nodes with exact value`,
      `${fieldName}_not: Boolean # matches all nodes with different value`
    ];
  }

  return [];
}

export function wrapType(field: any, schema: GraphQLSchema, ScalarClass: any) {
  if (field.type instanceof GraphQLNonNull && field.type.ofType instanceof GraphQLScalarType) {
    const baseType = new ScalarClass(field.type.ofType);
    field.type = new GraphQLNonNull(baseType);
    field.type = baseType;
    schema.getTypeMap()[baseType.name] = baseType;
    return field;
  } else if (field.type instanceof GraphQLScalarType) {
    const newType = new ScalarClass(field.type);
    field.type = newType;
    schema.getTypeMap()[newType.name] = newType;
    return field;
  } else {
    throw new Error(`Not a scalar type: ${field.type}`);
  }
}
