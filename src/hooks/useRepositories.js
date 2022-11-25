import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      onError: (err) => {
        console.log(err)
      },
      fetchPolicy: 'cache-and-network',
      variables,
    }
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    }).catch((e) => console.log(e))
  }

  const getRepositories = async ({
    ownerName,
    orderDirection,
    orderBy,
    searchKeyword,
    first,
    after,
  }) => {
    return await refetch({
      ownerName,
      orderBy,
      orderDirection,
      searchKeyword,
      first,
      after,
    }).catch((e) => console.log(e))
  }

  return loading
    ? {}
    : {
        repositories: data.repositories,
        error,
        fetchMore: handleFetchMore,
        loading,
        ...result,
        getRepositories,
        refetch: getRepositories,
      }
}

export default useRepositories
