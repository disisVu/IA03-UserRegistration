import { Box } from '@mui/material'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { colors } from '~/styles'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { ButtonPrimary } from '../Button/FullWidth'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginModal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [emailIndicator, setEmailIndicator] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordIndicator, setPasswordIndicator] = useState<string>('')

  const handleEmailChange = (value: string, indicator: string) => {
    setEmail(value)
    setEmailIndicator(indicator)
  }

  const handlePasswordChange = (value: string, indicator: string) => {
    setPassword(value)
    setPasswordIndicator(indicator)
  }

  const handleLogin = () => {
    if (emailIndicator === '' && passwordIndicator === '') {
      // Handle first submit attempt
      if (email === '' || password === '') {
        setEmailIndicator('Required')
        setPasswordIndicator('Required')
      }
      // Proceed with login if both fields are valid
      console.log('Logging in with:', { email, password })
    } else {
      console.log('Please fill out the form correctly.')
    }
  }

  const handleNavigateToRegistration = () => {
    navigate('/user/registration')
  }

  return (
    <PrimaryModal isOpen={true}>
      <div className='w-full flex flex-col gap-8'>
        <Box className='w-full flex flex-col items-start gap-1'>
          <span style={{ color: colors.text_primary }} className='text-3xl font-bold'>
            Login
          </span>
          <span style={{ color: colors.text_secondary }} className='text-sm'>
            Welcome back!
          </span>
        </Box>
        <Box className='w-full flex flex-col items-start gap-4'>
          <EmailTextField value={email} indicator={emailIndicator} onChange={handleEmailChange} />
          <PasswordTextField value={password} indicator={passwordIndicator} onChange={handlePasswordChange} />
        </Box>
        <Box className='w-full flex flex-col items-center'>
          <ButtonPrimary
            enabled={true}
            text='Confirm'
            onClick={() => {
              handleLogin()
            }}
          />
          <Box className='text-sm flex flex-row gap-2'>
            <span style={{ color: colors.text_secondary }}>Don't have an account?</span>
            <span
              style={{ color: colors.primary }}
              className='font-medium cursor-pointer'
              onClick={() => {
                handleNavigateToRegistration()
              }}
            >
              Sign up
            </span>
          </Box>
        </Box>
      </div>
    </PrimaryModal>
  )
}
