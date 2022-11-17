import { View, StyleSheet } from 'react-native'
import { Text, Button, Column, Row } from './UtilComponents'
import Avatar from './Avatar'

const styles = StyleSheet.create({
  card: {
    background: 'white',
    marginBottom: 20,
  },
})

const changeThousands = (number) => {
  return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number
}

const RepositoryItem = ({ item }) => {
  const stars = changeThousands(item.stargazersCount)
  const forks = changeThousands(item.forksCount)
  const reviews = changeThousands(item.reviewCount)

  return (
    <View style={styles.card}>
      {console.log('card')}
      <Row itemNumber={2}>
        <Avatar url={item.ownerAvatarUrl} />
        <Column>
          <Row>
            <Column>
              <Text fontWeight={'bold'}>{item.fullName}</Text>
              <Text>{item.description}</Text>
            </Column>
          </Row>
          <Row itemNumber={1}>
            <Button color={'white'} background={'blue'} text={item.language} />
          </Row>
        </Column>
      </Row>
      <Row itemNumber={4}>
        <Column>
          <Text>{stars}</Text>
          <Text>stars</Text>
        </Column>
        <Column>
          <Text>{forks}</Text>
          <Text>forks</Text>
        </Column>
        <Column>
          <Text>{reviews}</Text>
          <Text>reviews</Text>
        </Column>
        <Column>
          <Text>{item.ratingAverage}</Text>
          <Text>rating</Text>
        </Column>
      </Row>
    </View>
  )
}

export default RepositoryItem
