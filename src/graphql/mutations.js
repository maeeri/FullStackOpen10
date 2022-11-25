import { gql } from '@apollo/client'
import { REVIEW_DETAILS } from './fragments'

export const LOGIN = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      expiresAt
      user {
        username
        id
      }
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      ...ReviewDetails
    }
  }
  ${REVIEW_DETAILS}
`

export const SIGNUP = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`
export const REMOVE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`
