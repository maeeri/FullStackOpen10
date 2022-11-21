// import { Text, TextInput, Column, Button } from './UtilComponents'
import { Formik } from 'formik'
import { View, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Button } from './UtilComponents'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import { useNavigate } from "react-router-native"

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
      <FormikTextInput name="username" placeholder="username" />
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

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()


  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
    } catch (e) {
      console.log(e)
    }
    navigate("/", {replace: true})
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
