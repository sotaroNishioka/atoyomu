/* eslint-disable jsx-a11y/anchor-is-valid */
import { Email } from '@mui/icons-material'
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  Link,
  TextField
} from '@mui/material'
import useKeyboard from '../../../common/hooks/useKeyboard'
import useLoading from '../../../common/hooks/useLoading'
import GoogleButton from '../../ui-element/buttons/GoogleButton'
import useLogIn from './useLoginForm'

export const LoginForm = () => {
  // hooks
  const keyBoard = useKeyboard()
  const {
    passwordError,
    setEmail,
    setPassword,
    emailError,
    loginWithEmail,
    loginWithGoogle
  } = useLogIn()
  const loading = useLoading()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <TextField
        margin="dense"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        name="email"
        type="email"
        autoFocus
        onChange={(event) => setEmail(event.target.value)}
        onKeyPress={(event) => keyBoard.onPressEnter(loginWithEmail, event)}
      />
      <FormHelperText error>
        {emailError === '' ? '　' : emailError}
      </FormHelperText>
      <TextField
        margin="dense"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        onChange={(event) => setPassword(event.target.value)}
        onKeyPress={(event) => keyBoard.onPressEnter(loginWithEmail, event)}
      />
      <FormHelperText error>
        {passwordError === '' ? '　' : passwordError}
      </FormHelperText>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/signup" variant="body2">
            はじめての方はこちら
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={loginWithEmail}
        startIcon={<Email />}
        disabled={loading.isLoading}
      >
        ログイン
      </Button>
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/resetpassword" variant="body2">
            パスワードをお忘れの方はこちら
          </Link>
        </Grid>
      </Grid>
      <GoogleButton onClick={loginWithGoogle}>
        Googleアカウントでログイン
      </GoogleButton>
    </Box>
  )
}
