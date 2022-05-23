import { Box, FormHelperText, TextField } from '@mui/material'
import useKeyboard from '../../common/hooks/useKeyboard'

const SignUpTextField: React.FC<{
  email: string
  emailError: string
  onChange: (arg: string) => void
  onSubmit: () => void
}> = ({ email, emailError, onChange, onSubmit }) => {
  const keyBoard = useKeyboard()
  return (
    <Box>
      <TextField
        value={email}
        margin="dense"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        type="email"
        autoFocus
        onChange={(event) => onChange(event.target.value)}
        onKeyPress={(event) => keyBoard.onPressEnter(onSubmit, event)}
      />
      <FormHelperText error>
        {emailError === '' ? '　' : emailError}
      </FormHelperText>
    </Box>
  )
}

export default SignUpTextField
