import { GET_REPOSITORY_DETAILS } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'

const useOneRepository = ({...variables}) => {
  const { repositoryId } = useParams()
  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_DETAILS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { repositoryId, ...variables },
      onError: (err) => {
        console.log(err)
      },
    }
  )


  const handleFetchMoreReviews = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    }).catch(e => console.log(e))
  }

  console.log(variables)

  return loading
    ? {}
    : {
        repository: data.repository,
        error,
        loading,
        refetch,
        fetchMore: handleFetchMoreReviews,
        ...result,
      }
}

export default useOneRepository
