/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectDetailsQuery
// ====================================================

export interface ProjectDetailsQuery_projects {
  __typename: "Project";
  id: string;
  operators: any[];
  shareableContractAddress: any | null;
  likeContractAddress: any | null;
  endorseContractAddress: any | null;
}

export interface ProjectDetailsQuery {
  projects: ProjectDetailsQuery_projects[];
}
