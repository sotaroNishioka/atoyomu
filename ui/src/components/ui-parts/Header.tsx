import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'
import { AppLogo } from '../../common/static/images'
import OutLinedButton from '../ui-elements/button/OutLinedButton'
import TextButton from '../ui-elements/button/TextButton'

const Header = () => {
  // init
  const auth = getAuth()
  const { drawerWidth, openDrawer } = useDrawer()
  const router = useRouter()
  const { isMobileSize } = useSize()

  // state
  const [isLogin, setIsLogin] = useState<boolean>(true)

  // effect
  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      setIsLogin(false)
      return
    }
    setIsLogin(true)
  })

  // functions
  const onClickLogin = () => {
    router.push('/login')
  }
  const onClickSignUp = () => {
    router.push('/signup')
  }

  // 未ログインの場合
  const unregisteredUserMenu = (
    <Box>
      <TextButton
        text="ログイン"
        size="small"
        onClick={onClickLogin}
        sx={{ marginRight: 1 }}
      />
      <OutLinedButton size="small" text="新規登録" onClick={onClickSignUp} />
    </Box>
  )

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'secondary.main',
        backgroundColor: 'primary.light'
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Toolbar
          style={{ width: '100%' }}
          disableGutters={isLogin && !isMobileSize}
        >
          {isLogin && isMobileSize && (
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              onClick={openDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: 'inline-flex',
              width: isMobileSize ? 'auto' : drawerWidth,
              justifyContent: 'center'
            }}
          >
            <Image
              width={isMobileSize ? '126' : '140'}
              height={isMobileSize ? '28.8' : '32'}
              alt="icon"
              src={AppLogo}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {isLogin === false && unregisteredUserMenu}
        </Toolbar>
      </Grid>
    </AppBar>
  )
}

export default Header
