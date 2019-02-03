import * as functions from 'firebase-functions';
import { ApolloServer, gql } from 'apollo-server-cloud-functions';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!'
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});

export const graphql = functions.https.onRequest(server.createHandler());
