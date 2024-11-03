import { Box } from '@mui/material'
import { colors } from '~/styles/index'

interface ButtonPrimaryProps {
  enabled: boolean
  text: string
  onClick: () => void
}

export function ButtonPrimary({ enabled, text, onClick }: ButtonPrimaryProps) {
  return (
    <Box
      className={`${enabled ? 'cursor-pointer' : ''} w-full mb-5 py-3 flex justify-center items-center rounded-xl`}
      sx={{
        backgroundColor: enabled ? colors.primary : colors.button_secondary,
        color: enabled ? '#fff' : colors.text_primary,
        ':hover': {
          filter: enabled ? 'brightness(105%)' : colors.button_secondary
        }
      }}
      onClick={onClick}
    >
      <span className='text-sm font-semibold'>{text}</span>
    </Box>
  )
}

interface ButtonTransparentProps {
  text: string
  onClick: () => void
}

export function ButtonTransparent({ text, onClick }: ButtonTransparentProps) {
  return (
    <Box
      className='cursor-pointer w-full h-10 my-1 flex justify-center items-center rounded-xl'
      sx={{
        color: colors.primary,
        ':hover': {
          backgroundColor: '#eee'
        }
      }}
      onClick={onClick}
    >
      <span className='text-sm font-semibold'>{text}</span>
    </Box>
  )
}
