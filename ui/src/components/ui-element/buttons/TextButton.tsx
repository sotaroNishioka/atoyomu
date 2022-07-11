import MuiButton, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  size?: 'medium' | 'small' | 'large'
  onClick?: () => void
  children: JSX.Element | string
} & ButtonProps

const TextButton: React.FC<Props> = React.memo(
  ({ size = 'medium', onClick, children, ...buttonProps }) => {
    const fontSize = 'caption'
    return (
      <MuiButton onClick={onClick} variant="text" size={size} {...buttonProps}>
        <Typography
          variant={fontSize}
          sx={{
            fontWeight: '600',
            paddingRight: 1,
            paddingLeft: 1,
            lineHeight: 'inherit'
          }}
        >
          {children}
        </Typography>
      </MuiButton>
    )
  }
)
export default TextButton
