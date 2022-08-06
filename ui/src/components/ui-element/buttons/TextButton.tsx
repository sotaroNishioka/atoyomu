import MuiButton from '@mui/material/Button'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'

type Props = {
  size?: 'medium' | 'small' | 'large'
  onClick?: () => void
  children: string
  sx?: SxProps<Theme> | undefined
}

const TextButton: React.FC<Props> = React.memo(
  ({ size = 'medium', onClick, children, sx }) => (
    <MuiButton
      onClick={onClick}
      variant="text"
      size={size}
      sx={{ fontWeight: 700, pl: 2, pr: 2, ...sx }}
    >
      {children}
    </MuiButton>
  )
)
export default TextButton
