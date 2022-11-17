import { Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 10,
    flexGrow: 0,
  },
})

const Avatar = ({ url }) => {
  return <Image style={styles.avatar} source={{ uri: url }} />
}

export default Avatar
