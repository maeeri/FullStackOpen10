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
        {console.log('routes')}
        
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn title={'sign in here'} />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}

export default Main
