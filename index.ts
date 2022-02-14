import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { schemaDefs } from './schema';
import { resolvers } from './resolvers';
import http from 'http';
import app from './app';
import { initAppMiddleware } from './app';
import { GraphQLSchema } from 'graphql';

const PORT = 4000;

async function startApolloServer(schema: GraphQLSchema) {
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema: schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground]
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });

    initAppMiddleware();

    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

const schema = makeExecutableSchema({
    typeDefs: schemaDefs,
    resolvers,
});

startApolloServer(schema ).then( () => {
    console.log('start server finished');
}).catch(err => {
    console.error(err);
});
