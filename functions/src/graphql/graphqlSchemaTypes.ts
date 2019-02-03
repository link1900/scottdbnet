import { IResolvers, IEnumResolver } from '../graphql/graphqlTools';
import { DocumentNode, GraphQLScalarType } from 'graphql';

export interface GraphqlRoot {}

export interface GraphqlInfo {}

export interface MutationInput {
  clientMutationId?: string;
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
  TYPE
}

export type DirectResolverFunction = () => any;

export type ResolverFunction = (root: any, args: any, context: any, info: any) => any;

export type ResolverMiddleware = (baseResolver: ResolverFunction) => ResolverFunction;

export type ContextGeneratorFunction = (request: Request, context?: Context) => Context;

export interface GraphqlTypeDefinition {
  name: string;
  kind: GraphqlDefinitionKind;
  definition: DocumentNode;
  resolver: DirectResolverFunction | ResolverFunction | GraphQLScalarType | IEnumResolver;
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
}

export interface MutationOptions {
  name: string;
  definition: DocumentNode;
  resolver: (input: MutationInput, context?: Context, info?: GraphqlInfo) => any;
}

export interface QueryOptions {
  name: string;
  definition: DocumentNode;
  resolver: (root: any, args: any, context: any, info: any) => any;
}

export interface TypeOptions {
  name: string;
  definition: DocumentNode;
  resolver: (root: any, args: any, context: any, info: any) => any;
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
