import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import { AuthenticationLayout, MainLayout } from '~/layouts'
import { HomePage, LoginPage, RegistrationPage } from '~/pages'
import { theme } from '~/theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path='/user' element={<AuthenticationLayout />}>
            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/registration' element={<RegistrationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
