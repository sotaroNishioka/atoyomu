/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography
} from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import useKeyboard from '../../../common/hooks/useKeyboard'
import useLoading from '../../../common/hooks/useLoading'
import { isValidPassword } from '../../../common/util/validator'
import useRegister from './useRegisterForm'

export const RegisterForm: NextPage = () => {
  const register = useRegister()
  const loading = useLoading()
  const keyboard = useKeyboard()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <Typography color="primary" fontWeight="bold" align="left" variant="h5">
        プロフィール登録
      </Typography>
      <Typography
        color="primary"
        align="left"
        variant="subtitle1"
        sx={{ mb: 5 }}
      >
        新規ユーザーを作成します。
        <br />
        プロフィールを入力してください。
      </Typography>
      <Typography color="primary" variant="subtitle1">
        メールアドレス
      </Typography>
      <TextField
        required
        fullWidth
        disabled
        value={register.email}
        variant="standard"
      />
      <FormHelperText sx={{ mb: 4 }}>
        仮登録でご登録いただいたメールアドレスです。
        <br />
        変更される場合は再度新規登録を行ってください。
      </FormHelperText>
      <Typography color="primary" variant="subtitle1">
        パスワード
      </Typography>
      <TextField
        value={register.password1}
        onChange={(event) => register.setPassword1(event.target.value)}
        onKeyPress={(event) =>
          keyboard.onPressEnter(() => {
            if (!register.isValidInput || loading.isLoading) {
              return
            }
            register.signUpWithEmail()
          }, event)
        }
        required
        fullWidth
        name="password"
        type="password"
        id="password1"
        variant="outlined"
      />
      <FormHelperText
        sx={{ mb: 4 }}
        error={
          register.password1 !== '' &&
          isValidPassword(register.password1) === false
        }
      >
        パスワードの長さは8-16文字です。
        <br />
        パスワードには英小文字、大文字、数字、記号のうち3種類以上使用してください。
        <br />
      </FormHelperText>
      <Typography color="primary" variant="subtitle1">
        パスワード（再入力）
      </Typography>
      <TextField
        value={register.password2}
        onChange={(event) => register.setPassword2(event.target.value)}
        onKeyPress={(event) =>
          keyboard.onPressEnter(() => {
            if (!register.isValidInput || loading.isLoading) {
              return
            }
            register.signUpWithEmail()
          }, event)
        }
        required
        fullWidth
        name="password"
        type="password"
        id="password2"
        variant="outlined"
      />
      <FormHelperText error sx={{ mb: 4 }}>
        {register.password2 !== '' && register.password1 !== register.password2
          ? 'パスワードが一致しません。'
          : '　'}
      </FormHelperText>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={register.signUpWithEmail}
        sx={{ mt: 3, mb: 2 }}
        disabled={!register.isValidInput || loading.isLoading}
      >
        登録
      </Button>
    </Box>
  )
}
