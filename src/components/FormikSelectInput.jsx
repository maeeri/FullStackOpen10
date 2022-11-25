import { Picker } from '@react-native-community/picker'
import { useField } from 'formik'
import { inputStyles } from './FormikTextInput'
import { Text } from './UtilComponents'

const FormikSelectInput = ({
  name,
  options,
  handleChange,
  values,
  initialValue,
  ...props
}) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  if (!options) return null

  return (
    <SelectInput
      handleChange={handleChange}
      values={values}
      showError={showError}
      helpers={helpers}
      initialValue={initialValue}
      options={options}
      meta={meta}
      field={field}
      {...props}
    />
  )
}

export const SelectInput = ({
  handleChange,
  values,
  showError,
  helpers,
  initialValue,
  options,
  meta,
  field,
  ...props
}) => {
  const handleFieldChange = (value) => {
    handleChange ? handleChange(value) : helpers.setValue(value)
    meta && helpers.setTouched(true, true)
  }

  if (field) {
    console.log(field, meta)
    console.log(meta.touched)
  }

  return (
    <>
      <Picker
        enabled={true}
        mode="dropdown"
        onValueChange={(value) => handleFieldChange(value)}
        selectedValue={values}
        error={showError}
        onBlur={() => helpers.setTouched(true, true)}
        {...props}
        style={showError ? inputStyles.errorBorder : inputStyles.inputBorder}
      >
        <Picker.Item value="" label={initialValue} />
        {options.map((item) => {
          return <Picker.Item label={item} value={item} key={item} />
        })}
      </Picker>
      {showError && <Text style={inputStyles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikSelectInput
