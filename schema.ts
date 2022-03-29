import { gql } from 'apollo-server';
import { TypeSource } from '@graphql-tools/utils';

export const schemaDefs: TypeSource = gql`
  type Book {
    title: String!
    author: String!
  }

  type MultiplyResult {
    value: Int!
  }

  type Query {
    allBooks: [Book!]!
    multiply(value1: Int!, value2: Int!): MultiplyResult!
    getMetadataUploadMessageToSign(txHash: String!, metadata: String!): String!
  }
`;
