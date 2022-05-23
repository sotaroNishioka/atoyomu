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
import useLoading from '../../../common/hooks/useLoading'
import useAuthAction from './useAuthActionForm'

export const AuthActionForm: NextPage = () => {
  const authAction = useAuthAction()
  const loading = useLoading()

  return (
    <Box maxWidth={480} sx={{ width: 1 }}>
      <Typography color="primary" fontWeight="bold" align="left" variant="h5">
        パスワード再設定
      </Typography>
      <Typography
        color="primary"
        align="left"
        variant="subtitle1"
        sx={{ mb: 4, mt: 2 }}
      >
        パスワードを再設定します。
        <br />
        新しいパスワードを入力してください。
      </Typography>
      <Typography color="primary" variant="subtitle1">
        パスワード
      </Typography>
      <TextField
        value={authAction.password1}
        onChange={(event) => authAction.setPassword1(event.target.value)}
        required
        fullWidth
        name="password"
        type="password"
        id="password1"
        variant="outlined"
      />
      <FormHelperText
        sx={{ mb: 4 }}
        error={authAction.password1 !== '' && authAction.isValidInput === false}
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
        value={authAction.password2}
        onChange={(event) => authAction.setPassword2(event.target.value)}
        required
        fullWidth
        name="password"
        type="password"
        id="password2"
        variant="outlined"
      />
      <FormHelperText error sx={{ mb: 4 }}>
        {authAction.password2 !== '' &&
        authAction.password1 !== authAction.password2
          ? 'パスワードが一致しません。'
          : '　'}
      </FormHelperText>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={authAction.updatePassword}
        sx={{ mt: 3, mb: 2 }}
        disabled={!authAction.isValidInput || loading.isLoading}
      >
        パスワードを再設定
      </Button>
    </Box>
  )
}
