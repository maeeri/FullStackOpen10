import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    onError: (err) => {
      console.log(err)
    },
    fetchPolicy: 'cache-and-network',
  })

  return loading ? {} : { repositories: data.repositories, error, loading, refetch }
}

export default useRepositories
