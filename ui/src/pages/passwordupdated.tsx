/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container, Typography } from '@mui/material'
import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AppLogo, Check } from '../common/static/images'
import UnAuthRoute from '../components/functional/UnAuthRoute'

const PasswordUpdated: NextPage = () => {
  const auth = getAuth()
  const router = useRouter()

  // ログイン済みの場合は管理画面に遷移
  useEffect(() => {
    if (auth.currentUser !== null) {
      router.push('/home')
    }
  }, [auth.currentUser])

  return (
    <UnAuthRoute>
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
            <Image width="240" height="240" alt="check" src={Check} />
          </Box>
          <Box>
            <Typography
              color="primary"
              fontWeight="bold"
              align="center"
              variant="h5"
              sx={{ mb: 1 }}
            >
              パスワードを更新しました
            </Typography>
            <Typography
              color="primary"
              align="center"
              variant="subtitle1"
              fontWeight="bold"
              sx={{ mb: 2 }}
            >
              下記よりもう一度ログインを行ってください。
            </Typography>
            <Link href="/login" passHref>
              <Typography
                color="primary"
                align="center"
                variant="h6"
                fontWeight="bold"
                sx={{ cursor: 'pointer' }}
              >
                ログインページへ
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </UnAuthRoute>
  )
}

export default PasswordUpdated
