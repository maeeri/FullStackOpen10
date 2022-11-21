import { LOGIN } from '../graphql/mutations'
import { useMutation, useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(LOGIN, {
    onError: (err) => {
      console.log(err)
    },
  })

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    })

    console.log(data.authenticate.accessToken)
    await authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }

  return [signIn, result]
}

export default useSignIn
