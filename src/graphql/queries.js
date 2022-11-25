import { gql } from '@apollo/client'
import {
  REPOSITORY_DETAILS,
  REVIEW_DETAILS,
  PAGE_INFO_DETAILS,
} from './fragments'

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $ownerName: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      ownerName: $ownerName
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO_DETAILS}
`

export const GET_SIGNED_IN_USER = gql`
  query getCurrentUser(
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${PAGE_INFO_DETAILS}
  ${REVIEW_DETAILS}
`

export const GET_REPOSITORY_DETAILS = gql`
  query getRepository($first: Int, $repositoryId: ID!, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        pageInfo {
          ...PageInfoDetails
        }
        edges {
          cursor
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
  ${PAGE_INFO_DETAILS}
`
//
