import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import SignIn from './SignIn'
import AppBar from './AppBar'
import { Container } from './UtilComponents'

const Main = () => {
  return (
    <Container>
      <AppBar />

      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn title={'sign in here'} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}

export default Main
