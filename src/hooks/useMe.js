import { useQuery } from '@apollo/client'
import useAuthStorage from './useAuthStorage'
import { GET_SIGNED_IN_USER } from '../graphql/queries'

const useMe = ({ ...variables }) => {
  const authStorage = useAuthStorage()
  const token = authStorage.getAccessToken()
  const { data, error, loading, refetch, fetchMore } = useQuery(
    GET_SIGNED_IN_USER,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onError: (err) => {
        console.log('me', err)
      },
      variables: { ...variables },
    }
  )
  console.log(variables, data)

  const user = data.me ? data.me : {}

  const handleFetchMoreReviews = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage
    console.log(canFetchMore)
    if (!canFetchMore) {
      return
    }
    console.log(user)
    const { first } = variables
    console.log(first)
    console.log(user.reviews.pageInfo.endCursor)

    fetchMore({
      first,
      after: user.reviews.pageInfo.endCursor,
    })
    console.log(user.reviews.edges.length)
  }

  return !loading
    ? { user, error, loading, refetch, fetchMore: handleFetchMoreReviews }
    : {}
}

export default useMe
//
