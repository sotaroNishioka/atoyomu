import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useAuth from '../../common/hooks/useAuth'
import useDrawer from '../../common/hooks/useDrawer'
import useSize from '../../common/hooks/useSize'
import { AppLogo } from '../../common/static/images'
import OutLinedButton from '../ui-element/buttons/OutLinedButton'
import TextButton from '../ui-element/buttons/TextButton'

const Header = () => {
  // init
  const { push } = useRouter()
  const { drawerWidth, openDrawer } = useDrawer()
  const { isMobileSize } = useSize()
  const { isLogin } = useAuth()

  // functions
  const onClickLogin = () => {
    push('/login')
  }
  const onClickSignUp = () => {
    push('/signup')
  }

  if (isLogin === false) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position={isMobileSize ? 'static' : 'fixed'}
          elevation={0}
          sx={{
            borderBottom: 1,
            borderColor: 'secondary.main',
            backgroundColor: 'background.default'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar
              disableGutters={isMobileSize}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Image
                width={isMobileSize ? '126' : '140'}
                height={isMobileSize ? '28.8' : '32'}
                alt="icon"
                src={AppLogo}
              />
              <Box>
                <TextButton
                  size="medium"
                  onClick={onClickLogin}
                  sx={{ marginRight: 1 }}
                >
                  ログイン
                </TextButton>
                <OutLinedButton size="medium" onClick={onClickSignUp}>
                  新規登録
                </OutLinedButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'secondary.main',
          backgroundColor: 'background.default'
        }}
      >
        <Toolbar disableGutters={!isMobileSize}>
          {isMobileSize && (
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
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
