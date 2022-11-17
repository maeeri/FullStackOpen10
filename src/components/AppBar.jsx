import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { Text } from './UtilComponents'
import { Link } from 'react-router-native'

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Pressable>
          {console.log('something')}
          <Link to="/" style={styles.item}>
            <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
              Repositories
            </Text>
          </Link>
        </Pressable>
        <Pressable>
          <Link to="/signin" style={styles.item}>
            <Text color={'white'} fontSize={'subheading'} fontWeight={'bold'}>
              Sign in
            </Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export default AppBar
