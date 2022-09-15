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

  type Result {
    success: Boolean!,
    message: String
  }

  type Query {
    allBooks: [Book!]!
    multiply(value1: Int!, value2: Int!): MultiplyResult!
    getMetadataUploadMessageToSign(txHash: String!, metadata: String!): String!
    getConsentMessageToSign: String!
    getRevokeConsentMessageToSign: String!
    consentNeeded(address: String!): Boolean!
  }

  type Mutation {
    addPendingMetadata(
      pendingTxHash: String!,
      metadata: String!,
      signingAddress: String!,
      signature: String!,
    ): Result!
    addSignedConsent(
      signingAddress: String!,
      signature: String!,
      consentText: String!
    ): Result!
    revokeSignedConsent(
      signingAddress: String!,
      signature: String!,
      consentText: String!
    ): Result!
  }
`;
