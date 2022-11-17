import {
  Text as NativeText,
  TextInput as NativeTextInput,
  View,
  Pressable,
  StyleSheet,
} from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  textInput: {
    padding: 3,
    paddingLeft: 3,
    marginTop: 3,
    borderWidth: 1,
    borderRadius: 5,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorWhite: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  flexContainer: {
    backgroundColor: theme.colors.grey,
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
  },
  flexRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  flexRowOne: {
    justifyContent: 'flex-start',
  },
  flexRowTwo: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 3,
  },
  flexRowFour: {
    justifyContent: 'space-around',
    marginLeft: 3,
    paddingEnd: 30,
    paddingStart: 55,
    paddingTop: 5,
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexItemEven: {
    flexGrow: 1,
    margin: 8,
  },
  flexItemFitContent: {
    flexGrow: 0,
    flexShrink: 0,
  },
  btn: {
    textAlign: 'auto',
    padding: 8,
    borderRadius: 8,
  },
  blueBtn: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.colorWhite,
  },
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

const Container = ({ style, ...props }) => {
  const containerStyle = [styles.flexContainer, style]
  return <View style={containerStyle}>{props.children}</View>
}

const Row = ({ style, ...props }) => {
  const rowStyle = [
    props.itemNumber === 2 && styles.flexRowTwo,
    props.itemNumber === 4 && styles.flexRowFour,
    props.itemNumber === 1 && styles.flexRowOne,
    styles.flexRow,
    style,
  ]

  return <View style={rowStyle}>{props.children}</View>
}

const Column = ({ style, ...props }) => {
  const columnStyle = [styles.flexColumn, style]
  return <View style={columnStyle}>{props.children}</View>
}

const Button = ({ style, onPress, color, text, background }) => {
  const btnStyle = [
    background === 'blue' && styles.blueBtn,
    styles.flexItemFitContent,
    styles.btn,
    // { justifyContent: 'center' },
    style,
  ]

  return (
    <View>
      <Pressable onPress={onPress} style={btnStyle}>
        <Text color={color}>{text}</Text>
      </Pressable>
    </View>
  )
}

//eslint-disable-next-line no-unused-vars
const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.textInput, style]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export { Text, TextInput, Container, Row, Column, Button }
