import { gql } from 'apollo-server';
import { TypeSource } from '@graphql-tools/utils';

export const schemaDefs: TypeSource = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    allBooks: [Book]
  }
`;
