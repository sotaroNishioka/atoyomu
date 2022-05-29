import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  TextField,
  Toolbar
} from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { db } from '../../common/firebase/firebaseApp'
import useDrawer from '../../common/hooks/useDrawer'
import useKeyboard from '../../common/hooks/useKeyboard'
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
  const keyBoard = useKeyboard()

  // state
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [url, setUrl] = useState<string>('')

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
  const onSubmitUrl = async () => {
    const docRef = await addDoc(collection(db, 'bookmark'), {
      uid: auth.currentUser.uid ? 'auth.currentUser.uid' : 'user id === null',
      url: 'https://brightdata.com/blog/how-tos/user-agents-for-web-scraping-101',
      createdAt: serverTimestamp()
    })
    console.log(docRef)
    // return docRef.id
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
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <TextField
              value={url}
              id="url"
              // label="https://hogehoge.com"
              name="url"
              type="url"
              onChange={(event) => setUrl(event.target.value)}
              onKeyPress={(event) => keyBoard.onPressEnter(onSubmitUrl, event)}
            />
          </Box>

          {isLogin === false && unregisteredUserMenu}
        </Toolbar>
      </Grid>
    </AppBar>
  )
}

export default Header
