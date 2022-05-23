import MuiButton, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  text: String
  size?: 'medium' | 'small' | 'large'
  onClick?: () => void
} & ButtonProps

const TextButton: React.FC<Props> = React.memo(
  ({ text, size = 'medium', onClick, ...buttonProps }) => {
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
          {text}
        </Typography>
      </MuiButton>
    )
  }
)
export default TextButton
