import { SIGNUP } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import useSignIn from './useSignIn'

const useSignUp = () => {
  const [signIn] = useSignIn()
  const [mutate, result] = useMutation(SIGNUP, {
    onError: (e) => console.log(e),
  })

  const signUp = async ({ username, password }) => {
    await mutate({ variables: { user: { username, password } } })
    await signIn({ username, password })
  }

  return [signUp, result]
}

export default useSignUp
