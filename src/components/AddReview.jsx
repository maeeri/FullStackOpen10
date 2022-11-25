import useCreateReview from '../hooks/useCreateReview'
import { useFormik, FormikProvider } from 'formik'
import * as yup from 'yup'
import { Button } from './UtilComponents'
import { useNavigate } from 'react-router-native'
import useRepositories from '../hooks/useRepositories'
import FormikSelectInput from './FormikSelectInput'
import FormikTextInput from './FormikTextInput'

const initialValues = {
  ownerName: 'select owner name',
  repositoryName: 'select repository',
  rating: '',
  text: '',
}

const validationSchema = yup.object({
  ownerName: yup
    .string()
    .required('repository owner is required'),
  repositoryName: yup
    .string()
    .required('repository name is required'),
  text: yup.string(),
  rating: yup.number().min(0).max(100).integer().required('rating is required'),
})

const AddReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()
  const { repositories } = useRepositories()

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    onSubmit: (values) => submitReview(values),
    validationSchema: validationSchema,
  })

  const ownerNames = repositories
    ? [...new Set(repositories.edges.map((r) => r.node.ownerName))]
    : []
  const repositoryNames = repositories
    ? repositories.edges
        .filter((r) => r.node.ownerName === formik.values.ownerName)
        .map((r) => r.node.name)
    : []

  if (!repositories) return null

  const submitReview = async (values) => {
    const { ownerName, rating, repositoryName, text } = values
    console.log(values)

    try {
      await createReview({
        ownerName,
        rating,
        repositoryName,
        text,
      })
      navigate(`/${ownerName}.${repositoryName}`, { replace: true })
    } catch (e) {
      console.log('add review', e)
    }
  }

  return (
    <FormikProvider value={formik}>
      <FormikSelectInput
        handleChange={formik.handleChange('ownerName')}
        values={formik.values.ownerName}
        options={ownerNames}
        name="ownerName"
        initialValue={initialValues.ownerName}
      />
      <FormikSelectInput
        handleChange={formik.handleChange('repositoryName')}
        values={formik.values.repositoryName}
        options={repositoryNames}
        name="repositoryName"
        initialValue={initialValues.repositoryName}
      />
      <FormikTextInput
        keyboardType="numeric"
        name="rating"
        id="rating"
        placeholder="rating between 0 and 100"
        onChangeText={formik.handleChange('rating')}
        values={formik.values.rating}
      ></FormikTextInput>
      <FormikTextInput
        multiline={true}
        name="text"
        id="text"
        placeholder="review"
        onChangeText={formik.handleChange('text')}
        values={formik.values.text}
      ></FormikTextInput>
      <Button
        onPress={formik.handleSubmit}
        text="create a review"
        background={'blue'}
        color={'white'}
      ></Button>
    </FormikProvider>
  )
}

export default AddReview
