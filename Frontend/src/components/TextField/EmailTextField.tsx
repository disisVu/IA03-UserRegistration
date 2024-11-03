import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { useEffect, useState } from 'react'
import { TextFieldIndicator } from '~/components/Indicator'
import { colors } from '~/styles'
import { emailRegex } from '~/utils'

interface EmailTextFieldProps {
  value: string
  indicator: string
  onChange: (value: string, indicator: string) => void
}

export function EmailTextField({ value, indicator, onChange }: EmailTextFieldProps) {
  const [localValue, setLocalValue] = useState(value)
  const [localIndicator, setLocalIndicator] = useState(indicator)

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLocalValue(value)

    let newIndicator = ''
    if (value === '') {
      newIndicator = 'Required'
    } else if (!emailRegex.test(value)) {
      newIndicator = 'Invalid format'
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
          htmlFor='outlined-adornment-email'
          sx={{ color: localIndicator === '' ? colors.text_primary : '#f00' }}
        >
          Email
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-email'
          label='Email'
          placeholder='Enter email here'
          sx={{
            '& .MuiOutlinedInput-root': {
              fontSize: '14px',
              height: '56px',
              padding: '0 12px',
              borderRadius: '8px',
              color: colors.text_primary,
              '& input': {
                paddingLeft: '2px'
              }
            },
            '& .MuiInputLabel-root': {
              color: localIndicator === '' ? colors.text_primary : '#f00'
            },
            '& fieldset': {
              borderColor: localIndicator === '' ? colors.border : '#f00'
            }
          }}
          className='w-full'
          startAdornment={
            <InputAdornment position='start'>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginBottom: '1px' }} className='text-lg' />
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