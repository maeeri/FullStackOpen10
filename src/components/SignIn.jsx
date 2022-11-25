import { Text, Button } from './UtilComponents'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from 'react-router-native'
import { useState } from 'react'

const signInStyle = StyleSheet.create({
  margin: 15,
})

const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={signInStyle}>
      <FormikTextInput autoCapitalize="none" name="username" placeholder="username" />
      <FormikTextInput
        secureTextEntry={true}
        name="password"
        placeholder="password"
      />
      <Button
        onPress={onSubmit}
        text="Sign in"
        background={'blue'}
        color={'white'}
      />
    </View>
  )
}

export const SignInContainer = ({ title, onSubmit }) => {
  return (
    <>
      <Text>{title}</Text>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  )
}

const SignIn = ({ title }) => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
      setError(false)
    } catch (e) {
      console.log(e)
      setError(true)
    }
    !error && navigate('/', { replace: true })
  }
  return <SignInContainer onSubmit={onSubmit} title={title} />
}

export default SignIn
