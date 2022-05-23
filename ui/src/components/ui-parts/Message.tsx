import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'

const Message: React.FC<{
  isOpen: boolean
  message: string
  type: 'default' | 'warning' | 'error' | 'success'
  onClose: () => void
}> = (props) => {
  const { isOpen, message, type, onClose } = props

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  if (type === 'default') {
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        message={message}
        onClose={onClose}
        action={action}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    )
  }
  return (
    <Snackbar
      onClick={onClose}
      open={isOpen}
      autoHideDuration={6000}
      message={message}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity="error" sx={{ width: '100%' }} action={action}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Message
