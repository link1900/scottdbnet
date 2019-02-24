import { DocumentNode, FieldDefinitionNode, GraphQLSchema } from 'graphql';
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
  RootResolverType
} from './graphqlSchemaTypes';
import { base64Decode, base64Encode } from '../util/stringHelper';

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
      }

      resolvers[graphqlTypeDefinition.name] = graphqlTypeDefinition.resolver;
    }
  });

  const contextGenerator = (wrapper: { req: Request }): Context => {
    return applyGeneratorMiddlewares(contextFromRequestGenerator, contextGeneratorMiddlewares)(wrapper.req);
  };

  return {
    contextGenerator,
    typeDefs,
    resolvers
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

function canOrderFieldDefinition(fieldDefinition: FieldDefinitionNode): boolean {
  if (fieldDefinition.type.kind === 'NamedType') {
    return ['String', 'DateTime', 'Boolean', 'ID'].includes(fieldDefinition.type.name.value);
  }
  if (fieldDefinition.type.kind === 'NonNullType') {
    if (fieldDefinition.type.type.kind === 'NamedType') {
      return ['String', 'DateTime', 'Boolean', 'ID'].includes(fieldDefinition.type.type.name.value);
    }
  }
  return false;
}
