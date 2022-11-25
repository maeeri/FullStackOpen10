import { Button } from './UtilComponents'
import FormikTextInput from './FormikTextInput'
import { Formik } from 'formik'
import { View } from 'react-native'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'
import { useNavigate } from 'react-router-native'

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required('username is required'),
  password: yup.string().min(5).max(50).required('password is required'),
  confirmPassword: yup
    .string()
    .required('password confirmation is required')
    .oneOf([yup.ref('password')], 'passwords do not match'),
})

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput autoCapitalize="none" name="username" placeholder="username" />
      <FormikTextInput
        secureTextEntry={true}
        name="password"
        placeholder="password"
      />
      <FormikTextInput
        secureTextEntry={true}
        name="confirmPassword"
        placeholder="confirm password"
      />
      <Button
        onPress={onSubmit}
        text="Sign up"
        background={'blue'}
        color={'white'}
      />
    </View>
  )
}

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const navigate = useNavigate()

  const handleSignUp = async (values) => {
    const { username, password } = values
    try {
      await signUp({ username: username, password: password })
    } catch (e) {
      console.log(e)
    }
    navigate('/', { replace: true })
  }

  return <SignUpContainer onSubmit={handleSignUp} />
}

export default SignUp
