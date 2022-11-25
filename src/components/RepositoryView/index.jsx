import { Container, Row, Column, Button, Text } from '../UtilComponents'
import RepositoryItem from '../RepositoryList/RepositoryItem'
import useOneRepository from '../../hooks/useOneRepository'
import { FlatList, Linking } from 'react-native'
import theme from '../../theme'
import { ItemSeparator } from '../RepositoryList'
import { format } from 'date-fns'
import { StyleSheet } from 'react-native'

const RepositoryInfo = ({ repository }) => {
  const linkBtnStyle = {
    marginLeft: 110,
    marginBottom: 20,
  }
  const goToGitHub = (link) => {
    Linking.openURL(link)
  }

  return (
    <Container>
      <RepositoryItem item={repository} />
      <Row>
        <Column>
          <Button
            style={linkBtnStyle}
            color={'white'}
            background={'blue'}
            text="Open in GitHub"
            onPress={() => {
              goToGitHub(repository.url)
            }}
          />
        </Column>
      </Row>
    </Container>
  )
}

export const ReviewItem = ({ review, ...props }) => {
  const ratingStyle = StyleSheet.create({
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    width: 50,
    height: 50,
    textAlign: 'center',
    padding: 15,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: theme.colors.grey,
  })

  const reviewStyle = StyleSheet.create({
    backgroundColor: theme.colors.textWhite,
    paddingTop: 10,
    paddingBottom: 10,
  })

  const textStyle = StyleSheet.create({
    paddingRight: 100,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  })

  const dateCreated = format(new Date(review.node.createdAt), 'dd.MM.yyyy')

  return (
    <Container style={reviewStyle}>
      <Row>
        <Column>
          <Text fontWeight="bold" style={ratingStyle}>
            {review.node.rating}
          </Text>
        </Column>
        <Column>
          <Text fontWeight="bold">
            {props.userReviewView
              ? review.node.repository.fullName
              : review.node.user.username}
          </Text>
          <Text style={{ marginBottom: 5 }} color="textSecondary">
            {dateCreated}
          </Text>
          <Text style={textStyle}>{review.node.text}</Text>
        </Column>
      </Row>
      {props.children}
    </Container>
  )
}

const RepositoryView = () => {
  const { repository, fetchMore } = useOneRepository({
    first: 4,
  })

  if (!repository) return null
  const reviews = repository.reviews.edges

  console.log(reviews.length)
  const onEndReach = () => {
    fetchMore()
    console.log('end')
  }

  return (
    <Container>
      <Row>
        <FlatList
          data={reviews}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={(item) => item.node.id}
          ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
          ItemSeparatorComponent={ItemSeparator}
        />
      </Row>
    </Container>
  )
}

export default RepositoryView
