
import fetch from 'cross-fetch';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core';

export const theGraphApolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: process.env.SUBGRAPH_URI || 'https://api.thegraph.com/subgraphs/name/atarca/nft-share-platform-goerli',
        fetch
    })
});
