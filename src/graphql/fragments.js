import { gql } from '@apollo/client'

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
    ownerName
    name
  }
`

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repositoryId
    repository {
      fullName
    }
  }
`

export const PAGE_INFO_DETAILS = gql`
  fragment PageInfoDetails on PageInfo {
    startCursor
    endCursor
    hasNextPage
    hasPreviousPage
  }
`
