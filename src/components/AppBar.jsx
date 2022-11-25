import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { Text } from './UtilComponents'
import { Link } from 'react-router-native'
import useMe from '../hooks/useMe'
import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 10,
    paddingLeft: 15,
    backgroundColor: '#24292e',
  },
  item: {
    paddingRight: 10,
    color: 'white',
  },
})

const AppBar = () => {
  const { user } = useMe({includeReviews: false})
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signout = () => {
    authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Pressable>
          <Link to="/" style={styles.item}>
            <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
              Repositories
            </Text>
          </Link>
        </Pressable>
        {!user && (
          <Pressable>
            <Link to="/signin" style={styles.item}>
              <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
                Sign in
              </Text>
            </Link>
          </Pressable>
        )}
        {!user && (
          <Pressable>
            <Link to="/signup" style={styles.item}>
              <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
                Sign up
              </Text>
            </Link>
          </Pressable>
        )}
        {user && (
          <Pressable>
            <Link to="/addreview" style={styles.item}>
              <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
                Create a review
              </Text>
            </Link>
          </Pressable>
        )}
        {user && (
          <Pressable>
            <Link to="/myreviews" style={styles.item}>
              <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
                My reviews
              </Text>
            </Link>
          </Pressable>
        )}
        {user && (
          <Pressable onPress={signout}>
            <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
              Sign out
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
