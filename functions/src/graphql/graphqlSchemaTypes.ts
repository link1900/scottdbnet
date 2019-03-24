import { IResolvers, IEnumResolver } from '../graphql/graphqlTools';
import { DocumentNode, GraphQLScalarType } from 'graphql';
import { SchemaDirectiveVisitor } from 'apollo-server-cloud-functions';
import { Request } from 'express';

export interface GraphqlRoot {}

export interface GraphqlInfo {}

export interface MutationInput {
  clientMutationId?: string;
  [key: string]: any;
}

export interface MutationPayload {
  clientMutationId?: string;
}

export interface MutationArgs {
  input: MutationInput;
}

export declare type Context<T = any> = T;

export enum GraphqlDefinitionKind {
  QUERY,
  MUTATION,
  SCALAR,
  ENUM,
  TYPE,
  DIRECTIVE
}

export type DirectResolverFunction = () => any;

export type ResolverFunction = (root: any, args: any, context: any, info: any) => any;

export type NodeResolverFunction = (root: any, context: any, info: any) => any;

export type ResolverMiddleware = (baseResolver: ResolverFunction) => ResolverFunction;

export type ContextGeneratorFunction = (request: Request, context?: Context) => Context;

export interface GraphqlTypeDefinition {
  name: string;
  kind: GraphqlDefinitionKind;
  definition: DocumentNode;
  resolver:
    | DirectResolverFunction
    | ResolverFunction
    | GraphQLScalarType
    | IEnumResolver
    | IResolvers
    | SchemaDirectiveVisitor;
  nodeResolver?: NodeResolverFunction;
  hasConnection?: boolean;
}

export interface GraphqlSchemaDefinition {
  contextFromRequestGenerator: (req: Request) => Context;
  graphqlTypeDefinitions: GraphqlTypeDefinition[];
  contextGeneratorMiddlewares?: ContextGeneratorFunction[];
  mutationMiddlewares?: ResolverMiddleware[];
  resolverMiddlewares?: ResolverMiddleware[];
}

export interface GraphqlSchemaParts {
  contextGenerator: (req: any) => object;
  typeDefs: DocumentNode | DocumentNode[];
  resolvers: IResolvers;
  directives: Record<string, typeof SchemaDirectiveVisitor>;
}

export interface MutationOptions {
  name: string;
  definition: DocumentNode;
  resolver: (input: any, context?: Context, info?: GraphqlInfo) => any;
}

export interface QueryOptions {
  name: string;
  definition: DocumentNode;
  resolver: (root: any, args: any, context: any, info: any) => any;
}

export interface TypeOptions {
  name: string;
  definition: DocumentNode;
  resolver: any;
  nodeResolver?: NodeResolverFunction;
  hasConnection?: boolean;
}

export interface ScalarOptions {
  name: string;
  definition: DocumentNode;
  scalar: GraphQLScalarType;
}

export interface EnumOptions {
  name: string;
  definition: DocumentNode;
  resolver: IEnumResolver;
}

export interface DirectiveOptions {
  name: string;
  definition: DocumentNode;
  resolver: any;
}

export type NodeTypes = {
  [key: string]: NodeType;
};

export type NodeType = {
  name: string;
  type: any;
  resolver: any;
};

export type RootResolverType = {
  Query: {
    [key: string]: any;
  };
  Mutation: {
    [key: string]: any;
  };
  [key: string]: any;
};

export type ConnectionCursor = string;

export type ConnectionArguments = {
  before?: ConnectionCursor;
  after?: ConnectionCursor;
  first?: number;
  last?: number;
  orderBy?: string;
  filters?: {
    [key: string]: any;
  };
};

export type PageInfo = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Connection<T> = {
  edges: Array<Edge<T>>;
  pageInfo: PageInfo;
};

export type Edge<T> = {
  node: T;
  cursor: ConnectionCursor;
};
