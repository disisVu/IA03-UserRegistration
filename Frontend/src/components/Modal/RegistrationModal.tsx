import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'

import { PasswordComplexityBar } from '~/components/Bar'
import { ButtonPrimary } from '~/components/Button/FullWidth'
import { PrimaryModal } from '~/components/Modal/ModalLayouts'
import { EmailTextField, PasswordTextField } from '~/components/TextField'
import { computePasswordComplexity } from '~/utils'
import { colors } from '~/styles'

export function RegistrationModal() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [emailIndicator, setEmailIndicator] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordIndicator, setPasswordIndicator] = useState<string>('')
  const [passwordComplexity, setPasswordComplexity] = useState<number>(0)
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [confirmPasswordIndicator, setConfirmPasswordIndicator] = useState<string>('')

  const handleEmailChange = (value: string, indicator: string) => {
    setEmail(value)
    setEmailIndicator(indicator)
  }

  const handlePasswordChange = (value: string, indicator: string) => {
    setPassword(value)
    if (value !== confirmPassword) {
      setConfirmPasswordIndicator('Unmatched')
    } else {
      setConfirmPasswordIndicator('')
    }
    setPasswordIndicator(indicator)
    const complexity = computePasswordComplexity(value)
    setPasswordComplexity(complexity)
  }

  const handleConfirmPasswordChange = (value: string, indicator: string) => {
    setConfirmPassword(value)
    if (value !== password) {
      setConfirmPasswordIndicator('Unmatched')
    } else {
      setConfirmPasswordIndicator(indicator)
    }
  }

  const handleRegister = () => {
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

  const handleNavigateToLogin = () => {
    navigate('/user/login')
  }

  return (
    <PrimaryModal isOpen={true}>
      <div className='w-full flex flex-col gap-10'>
        <Box className='w-full flex flex-col items-start gap-1'>
          <span style={{ color: colors.text_primary }} className='text-3xl font-bold'>
            Registration
          </span>
          <span style={{ color: colors.text_secondary }} className='text-sm'>
            Create an account
          </span>
        </Box>
        <Box className='w-full flex flex-col items-start gap-7'>
          {/* Input new email */}
          <EmailTextField value={email} indicator={emailIndicator} onChange={handleEmailChange} />
          {/* Input new password */}
          <Box className='relative w-full'>
            <PasswordTextField value={password} indicator={passwordIndicator} onChange={handlePasswordChange} />
            {password !== '' && <PasswordComplexityBar complexity={passwordComplexity} />}
          </Box>
          {/* Confirm password */}
          <PasswordTextField
            value={confirmPassword}
            indicator={confirmPasswordIndicator}
            onChange={handleConfirmPasswordChange}
            label='Confirm Password'
            placeholder='Re-enter password here'
          />
        </Box>
        <Box className='w-full flex flex-col items-center'>
          <ButtonPrimary
            enabled={true}
            text='Confirm'
            onClick={() => {
              handleRegister()
            }}
          />
          <Box className='text-sm flex flex-row gap-2'>
            <span style={{ color: colors.text_secondary }}>Already have an account?</span>
            <span
              style={{ color: colors.primary }}
              className='font-medium cursor-pointer'
              onClick={() => {
                handleNavigateToLogin()
              }}
            >
              Sign in
            </span>
          </Box>
        </Box>
      </div>
    </PrimaryModal>
  )
}
