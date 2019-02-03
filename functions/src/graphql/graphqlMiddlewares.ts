import { Context, GraphqlInfo, GraphqlRoot, MutationArgs, ResolverFunction } from './graphqlSchemaTypes';

export function relayMutationMiddleware(baseResolver: ResolverFunction): ResolverFunction {
  return function mutateAndGetPayload(root: GraphqlRoot, args: MutationArgs, context: Context, info: GraphqlInfo) {
    const { input } = args;
    return Promise.resolve(baseResolver(root, args, context, info)).then(payload => {
      const clientMutationId = input && input.clientMutationId ? input.clientMutationId : undefined;
      return {
        ...payload,
        clientMutationId
      };
    });
  };
}
