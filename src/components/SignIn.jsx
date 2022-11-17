import { Text, TextInput, Column, Button } from './UtilComponents'

const SignIn = (props) => {
  return (
    <>
      <Column>
        {console.log('sign in form')}
        <Text color={'primary'}>{props.title}</Text>
        <TextInput />
        <Button />
      </Column>
    </>
  )
}

export default SignIn
