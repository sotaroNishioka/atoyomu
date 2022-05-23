import { Email } from '@mui/icons-material'
import { Box, Button, Grid, Link } from '@mui/material'
import useLoading from '../../../common/hooks/useLoading'
import GoogleButton from '../../ui-elements/button/GoogleButton'
import SignUpEmailTextField from '../../ui-elements/SignUpEmailTextField'
import useSignUp from './useSignUpForm'

export const SignUpForm = () => {
  const {
    email,
    emailError,
    setEmail,
    signUpWithGoogle,
    // signUpWithTwitter,
    onSubmitEmailSignup
  } = useSignUp()
  const loading = useLoading()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <SignUpEmailTextField
        email={email}
        emailError={emailError}
        onChange={setEmail}
        onSubmit={onSubmitEmailSignup}
      />
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/login" variant="body2">
            登録済みの方はこちら
          </Link>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={onSubmitEmailSignup}
        startIcon={<Email />}
        disabled={loading.isLoading}
      >
        新規登録
      </Button>
      <GoogleButton onClick={signUpWithGoogle} text="Googleアカウントで登録" />
      {/* <FacebookSignUpButton onClick={signUpWithTwitter} />
      <TwitterSignUpButton onClick={signUpWithTwitter} /> */}
    </Box>
  )
}
