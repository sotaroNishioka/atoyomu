import MuiButton, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React from 'react'

type Props = {
  size?: 'medium' | 'small' | 'large'
  onClick?: () => void
  children: JSX.Element | string
} & ButtonProps

const OutLinedButton: React.FC<Props> = React.memo(
  ({ children, size = 'medium', onClick, ...buttonProps }) => {
    const fontSize = 'caption'
    return (
      <MuiButton
        onClick={onClick}
        variant="outlined"
        size={size}
        sx={{
          borderColor: 'secondary.main'
        }}
        {...buttonProps}
      >
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
export default OutLinedButton
