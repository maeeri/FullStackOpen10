// import { Text, TextInput, Column, Button } from './UtilComponents'
import { Formik } from 'formik'
import { View } from 'react-native'
import FormikTextInput from './FormikTextInput'
import { Button } from './UtilComponents'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
})

const SignInForm = ({ onSubmit }) => {
  // const [usernameField, usernameMeta, usernameHelpers] = useField('username')
  // const [passwordField, passwordMeta, passwordHelpers] = useField('password')

  return (
    <View>
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
  const onSubmit = (values) => {
    console.log(values)
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
