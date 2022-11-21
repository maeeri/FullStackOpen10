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
  const { me } = useMe()
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
        {!me && (
          <Pressable>
            <Link to="/signin" style={styles.item}>
              <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
                Sign in
              </Text>
            </Link>
          </Pressable>
        )}
        {me && (
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
