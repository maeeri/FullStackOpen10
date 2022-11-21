import { useQuery } from '@apollo/client'
import useAuthStorage from './useAuthStorage'
import { GET_SIGNED_IN_USER } from '../graphql/queries'

const useMe = () => {
  const authStorage = useAuthStorage()
  const token = authStorage.getAccessToken()

  const { data, error, loading, refetch } = useQuery(GET_SIGNED_IN_USER, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    onError: (err) => {
      console.log('me', err)
    },
  })

  const me = data ? data.me : undefined

  return { me, error, loading, refetch }
}

export default useMe
