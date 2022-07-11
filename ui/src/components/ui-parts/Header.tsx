import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'
import { AppLogo } from '../../common/static/images'
import OutLinedButton from '../ui-element/buttons/OutLinedButton'
import TextButton from '../ui-element/buttons/TextButton'

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
      <TextButton size="small" onClick={onClickLogin} sx={{ marginRight: 1 }}>
        ログイン
      </TextButton>
      <OutLinedButton size="small" onClick={onClickSignUp}>
        新規登録
      </OutLinedButton>
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
          {isLogin === false && unregisteredUserMenu}
        </Toolbar>
      </Grid>
    </AppBar>
  )
}

export default Header
