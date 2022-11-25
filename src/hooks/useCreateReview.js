import { useMutation } from '@apollo/client'
import useAuthStorage from './useAuthStorage'
import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const authStorage = useAuthStorage()

  const [mutate, result] = useMutation(CREATE_REVIEW, {
    onError: (err) => {
      console.log(err)
    },
  })

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const token = await authStorage.getAccessToken()
    rating = Number(rating)

    await mutate({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      variables: {
        review: {
          ownerName,
          rating,
          repositoryName,
          text,
        },
      },
    }).catch((e) => console.log(e))
  }

  return [createReview, result]
}

export default useCreateReview
