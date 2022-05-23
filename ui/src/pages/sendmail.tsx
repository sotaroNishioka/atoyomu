/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AppLogo, Mail as SendMailImage } from '../common/static/images'

const SendMail: NextPage = () => {
  const auth = getAuth()
  const router = useRouter()

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.currentUser !== null) {
      router.push('/home')
    }
  }, [auth.currentUser])

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Image width="300" height="75" alt="icon" src={AppLogo} />
        </Box>
        <Box>
          <Image width="240" height="240" alt="sendmail" src={SendMailImage} />
        </Box>
        <Box>
          <Typography
            color="primary"
            fontWeight="bold"
            align="center"
            variant="h5"
            sx={{ mb: 1 }}
          >
            Thank You!!
          </Typography>
          <Typography
            color="primary"
            align="center"
            variant="subtitle1"
            fontWeight="bold"
          >
            ご登録いただいたメールアドレスに
            <br />
            メールを送信しましたのでご確認ください。
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default SendMail
