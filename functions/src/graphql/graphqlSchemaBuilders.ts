import { DocumentNode, GraphQLSchema } from 'graphql';
import { gql } from './graphqlTools';
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
  Context
} from './graphqlSchemaTypes';

export const rootDefinition = gql`
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  type Query {
    ping: Boolean!
  }

  type Mutation {
    ping: Boolean!
  }
`;

export const rootResolver: rootResolverType = {
  Query: {
    ping: () => true
  },
  Mutation: {
    ping: () => true
  }
};

export type rootResolverType = {
  Query: {
    [key: string]: any;
  };
  Mutation: {
    [key: string]: any;
  };
  [key: string]: any;
};

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
  const { name, definition, resolver } = typeOptions;
  return {
    name,
    kind: GraphqlDefinitionKind.TYPE,
    definition,
    resolver
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
      const typeResolver = graphqlTypeDefinition.resolver as ResolverFunction;
      resolvers[graphqlTypeDefinition.name] = applyMiddlewaresToResolver(typeResolver, resolverMiddlewares);
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
