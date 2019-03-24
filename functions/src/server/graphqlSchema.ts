import { GraphqlSchemaDefinition } from '../graphql/graphqlSchemaTypes';
import { relayMutationMiddleware } from '../graphql/graphqlMiddlewares';
import { createContextFromRequest } from './serverHelper';
import { applicationConfigType } from '../applicationConfig/applicationConfigType';
import { greyhoundType } from '../ranker/greyhound/greyhoundType';
import { dateTimeType } from '../graphql/types/dateTimeType';
import { rankerQuery, rankerType } from '../ranker/rankerType';
import { textFieldType } from '../graphql/types/textFieldType';
import { createGreyhoundMutation } from '../ranker/greyhound/createGreyhoundMutation';
import { greyhoundGenderType } from '../ranker/greyhound/greyhoundGenderType';
import { uppercaseDirective } from '../graphql/types/upperCaseDirective';
import { notEmptyDirective } from '../graphql/types/notEmptyDirective';
import { deleteGreyhoundMutation } from '../ranker/greyhound/greyhoundDeleteMutation';
import { nodeIdType } from '../graphql/types/nodeIdType';

export const graphqlSchemaDefinition: GraphqlSchemaDefinition = {
  contextFromRequestGenerator: createContextFromRequest,
  mutationMiddlewares: [relayMutationMiddleware],
  graphqlTypeDefinitions: [
    // common
    applicationConfigType,
    textFieldType,
    dateTimeType,
    uppercaseDirective,
    notEmptyDirective,
    nodeIdType,

    // ranker
    greyhoundType,
    rankerType,
    rankerQuery,
    greyhoundGenderType,
    createGreyhoundMutation,
    deleteGreyhoundMutation
  ]
};
