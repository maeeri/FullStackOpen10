import { StyleSheet } from 'react-native'
import { useField } from 'formik'
import { Text, TextInput } from './UtilComponents'
import theme from '../theme'

export const inputStyles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  inputBorder: {
    borderColor: theme.colors.textSecondary,
  },
  errorBorder: {
    borderColor: theme.colors.error,
  },
})

const FormikTextInput = ({ name, onChangeText, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  const onChange = (value) => {
    onChangeText && onChangeText
    helpers.setValue(value)
  }

  return (
    <>
      <TextInput
        onChangeText={onChange}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        style={showError ? inputStyles.errorBorder : inputStyles.inputBorder}
      />
      {showError && <Text style={inputStyles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
