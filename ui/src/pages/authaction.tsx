/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'
import { AppLogo } from '../common/static/images'
import UnAuthRoute from '../components/functional/UnAuthRoute'
import { AuthActionForm } from '../components/ui-parts/AuthActionForm/AuthActionForm'

const AuthAction: NextPage = () => (
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
          <Image width="300" height="75" src={AppLogo} />
        </Box>
        <AuthActionForm />
      </Box>
    </Container>
  </UnAuthRoute>
)

export default AuthAction
