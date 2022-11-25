import useMe from '../hooks/useMe'
import { ReviewItem } from './RepositoryView'
import { Alert, FlatList, StyleSheet } from 'react-native'
import { ItemSeparator } from './RepositoryList'
import { Button, Column, Container, Row } from './UtilComponents'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { REMOVE_REVIEW } from '../graphql/mutations'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const UserReviewItem = ({ review, confirmDelete }) => {
  const navigate = useNavigate()

  const styles = StyleSheet.create({
    buttonStyle: {
      margin: 15,
      padding: 20,
    },
    rowStyle: {
      justifyContent: 'space-between',
    },
  })

  const goToRepository = (repositoryId) => {
    navigate(`/${repositoryId}`, { replace: true })
  }
  return (
    <Container>
      <ReviewItem review={review} userReviewView={true}>
        <Row style={styles.rowStyle}>
          <Column>
            <Button
              onPress={() => goToRepository(review.node.repository.id)}
              style={styles.buttonStyle}
              color="white"
              fontWeight="bold"
              background="blue"
              text="view repository"
            />
          </Column>
          <Column>
            <Button
              onPress={() => confirmDelete(review.node.id)}
              style={styles.buttonStyle}
              color="white"
              fontWeight="bold"
              background="red"
              text="delete review"
            />
          </Column>
        </Row>
      </ReviewItem>
    </Container>
  )
}

const ReviewedRepositories = () => {
  const { user, refetch, fetchMore } = useMe({
    first: 3,
    includeReviews: true,
  })
  const authStorage = useAuthStorage()
  const [mutate] = useMutation(REMOVE_REVIEW, {
    onError: (e) => console.log(e),
  })
  const apolloClient = useApolloClient()

  const reviews = user ? user.reviews.edges : []

  const onEndReach = () => {
    console.log('end')
    fetchMore()
  }

  const removeReview = (deleteReviewId) => {
    const token = authStorage.getAccessToken()
    mutate({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      variables: { deleteReviewId },
    })
    refetch()
    apolloClient.resetStore()
  }

  const createAlert = (removeReviewId) => {
    Alert.alert('Delete', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel pressed'),
      },
      {
        text: 'Delete',
        onPress: () => removeReview(removeReviewId),
      },
    ])
  }

  console.log(reviews.length)

  return (
    <FlatList
      data={reviews}
      onEndReached={onEndReach}
      renderItem={({ item }) => (
        <UserReviewItem review={item} confirmDelete={createAlert} />
      )}
      keyExtractor={(item) => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default ReviewedRepositories
