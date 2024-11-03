import { useEffect, useState } from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import { useToggle } from '~/hooks/useToggle'
import { TextFieldIndicator } from '~/components/Indicator'
import { colors } from '~/styles'

interface PasswordTextFieldProps {
  value: string
  indicator: string
  onChange: (value: string, indicator: string) => void
  label?: string
  placeholder?: string
}

export function PasswordTextField({
  value,
  indicator,
  onChange,
  label = 'Password',
  placeholder = 'Enter password here'
}: PasswordTextFieldProps) {
  const { value: showPassword, toggle: toggleShowPassword } = useToggle(false)
  const [localValue, setLocalValue] = useState(value)
  const [localIndicator, setLocalIndicator] = useState(indicator)

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocalValue(value)

    let newIndicator = ''
    if (value === '') {
      newIndicator = 'Required'
    }
    setLocalIndicator(newIndicator)
    onChange(value, newIndicator)
  }

  useEffect(() => {
    setLocalValue(value)
    setLocalIndicator(indicator)
  }, [value, indicator])

  return (
    <div className='w-full flex flex-col items-start gap-1'>
      <FormControl sx={{ width: '100%' }} variant='outlined'>
        <InputLabel
          htmlFor={`outlined-adornment-${label}`}
          sx={{ color: localIndicator === '' ? colors.text_primary : '#f00' }}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id={`outlined-adornment-${label}`}
          required
          label={label}
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          sx={{
            fontSize: '14px',
            height: '56px',
            padding: '0px 12px',
            borderRadius: '8px',
            color: colors.text_primary,
            '& .MuiOutlinedInput-input': {
              paddingLeft: '2px'
            },
            '& fieldset': {
              borderColor: localIndicator === '' ? colors.border : '#f00'
            }
          }}
          startAdornment={
            <InputAdornment position='start'>
              <FontAwesomeIcon icon={faLock} className='text-lg mb-1' />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={toggleShowPassword}
                edge='end'
                disableRipple
                disableFocusRipple
                sx={{
                  '&:focus': {
                    outline: 'none'
                  }
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          value={localValue}
          onChange={handleTextFieldChange}
        />
      </FormControl>
      <TextFieldIndicator indicator={localIndicator} />
    </div>
  )
}
