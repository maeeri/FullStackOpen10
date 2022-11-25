import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import AppBar from './AppBar'
import { Container } from './UtilComponents'
import RepositoryView from './RepositoryView'
import AddReview from './AddReview'
import SignUp from './SignUp'
import ReviewedRepositories from './ReviewedRepositories'

const Main = () => {
  return (
    <Container>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:repositoryId" element={<RepositoryView />} />
        <Route path="/addreview" element={<AddReview />} />
        <Route path="/signin" element={<SignIn title={'sign in here'} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<ReviewedRepositories />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}

export default Main
