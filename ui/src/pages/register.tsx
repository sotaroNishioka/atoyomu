/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container } from '@mui/material'
import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { AppLogo } from '../common/static/images'
import UnAuthRoute from '../components/functional/UnAuthRoute'
import { RegisterForm } from '../components/ui-parts/RegisterForm/RegisterForm'

const Register: NextPage = () => {
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
            mt: 8,
            mb: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Image width="300" height="75" alt="icon" src={AppLogo} />
          </Box>
          <RegisterForm />
        </Box>
      </Container>
    </UnAuthRoute>
  )
}

export default Register
