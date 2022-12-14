import { gql } from '@apollo/client/core';

export const GET_ALL_PROJECTS = gql`
query ProjectDetailsQuery {
  projects {
    id
    operators
    shareableContractAddress
    likeContractAddress
    endorseContractAddress
  }
}`;